import type { SerializedListItemNode, SerializedListNode } from "@lexical/list";
import type {
  SerializedHeadingNode,
  SerializedQuoteNode,
} from "@lexical/rich-text";
import type {
  LinkFields,
  SerializedLinkNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";
import escapeHTML from "escape-html";
import type {
  SerializedElementNode,
  SerializedLexicalNode,
  SerializedTextNode,
} from "lexical";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "./nodeFormat";
import { RenderBlock } from "../renderBlock/RenderBlock";

interface Props {
  nodes: SerializedLexicalNode[];
}

interface UploadValue {
  id: string;
  alt: string | null | undefined;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  thumbnailURL: null;
}

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((_node, index): JSX.Element | null => {
        if (_node.type === "text") {
          const node = _node as SerializedTextNode;
          let text = <React.Fragment key={index}>{node.text}</React.Fragment>;
          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>;
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>;
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: "line-through" }}>
                {text}
              </span>
            );
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: "underline" }}>
                {text}
              </span>
            );
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{node.text}</code>;
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>;
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>;
          }

          return text;
        }

        if (_node == null) {
          return null;
        }

        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (
          node: SerializedElementNode
        ): JSX.Element | null => {
          if (node.children == null) {
            return null;
          } else {
            if (
              node?.type === "list" &&
              (node as SerializedListNode)?.listType === "check"
            ) {
              for (const item of node.children) {
                if ("checked" in item) {
                  if (!item?.checked) {
                    item.checked = false;
                  }
                }
              }
              return serializeLexical({ nodes: node.children });
            } else {
              return serializeLexical({ nodes: node.children });
            }
          }
        };

        const serializedChildren =
          "children" in _node
            ? serializedChildrenFn(_node as SerializedElementNode)
            : "";

        switch (_node.type) {
          case "linebreak": {
            return <br key={index} />;
          }
          case "paragraph": {
            return <p key={index}>{serializedChildren}</p>;
          }
          case "heading": {
            const node = _node as SerializedHeadingNode;

            type Heading = Extract<
              keyof JSX.IntrinsicElements,
              "h1" | "h2" | "h3" | "h4" | "h5"
            >;
            const Tag = node?.tag as Heading;
            return <Tag key={index}>{serializedChildren}</Tag>;
          }
          case "list": {
            const node = _node as SerializedListNode;

            type List = Extract<keyof JSX.IntrinsicElements, "ol" | "ul">;
            const Tag = node?.tag as List;
            return (
              <Tag className={`list`} key={index}>
                {serializedChildren}
              </Tag>
            );
          }
          case "listitem": {
            const node = _node as SerializedListItemNode;

            if (node?.checked != null) {
              return (
                <li
                  aria-checked={node.checked ? "true" : "false"}
                  className={`component--list-item-checkbox ${
                    node.checked
                      ? "component--list-item-checkbox-checked"
                      : "component--list-item-checked-unchecked"
                  }`}
                  key={index}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="checkbox"
                  tabIndex={-1}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              );
            } else {
              return (
                <li key={index} value={node?.value}>
                  {serializedChildren}
                </li>
              );
            }
          }
          case "quote": {
            const node = _node as SerializedQuoteNode;

            return <blockquote key={index}>{serializedChildren}</blockquote>;
          }
          case "code": {
            const node = _node as SerializedQuoteNode;

            return <code key={index}>{serializedChildren}</code>;
          }
          case "link": {
            const node = _node as SerializedLinkNode;

            const fields: LinkFields = node.fields;

            if (fields.linkType === "custom") {
              return (
                <Link
                  href={escapeHTML(fields.url)}
                  key={index}
                  {...(fields?.newTab
                    ? {
                        rel: "noopener noreferrer",
                        target: "_blank",
                      }
                    : {})}
                >
                  {serializedChildren}
                </Link>
              );
            } else {
              const slug =
                typeof fields.doc?.value === "object"
                  ? (fields.doc?.value.slug as string)
                  : "";
              const url = `/${slug}`;

              return (
                <Link
                  href={escapeHTML(url)}
                  key={index}
                  {...(fields?.newTab
                    ? {
                        rel: "noopener noreferrer",
                        target: "_blank",
                      }
                    : {})}
                >
                  {serializedChildren}
                </Link>
              );
            }
          }

          case "upload": {
            const node = _node as SerializedUploadNode;
            const value = node?.value as unknown as UploadValue | undefined;

            if (value) {
              return (
                <Image
                  src={value.url}
                  width={value.width}
                  height={value.height}
                  alt={value.alt || "upload"}
                />
              );
            }
          }
          case "block":
            //@ts-expect-error
            const props = _node.fields;
            const blockType = props?.blockType;

            if (!blockType) {
              return null;
            }

            return <RenderBlock {...props} />;

          default:
            return null;
        }
      })}
    </Fragment>
  );
}
