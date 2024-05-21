import { Button } from "@/components/ui/button";

export function Buttons() {
  return (
    <div className="container py-10">
      <div className="flex justify-center gap-4">
        <Button className="capitalize" variant="default">
          default
        </Button>
        <Button className="capitalize" variant="destructive">
          destructive
        </Button>
        <Button className="capitalize" variant="ghost">
          ghost
        </Button>
        <Button className="capitalize" variant="link">
          link
        </Button>
        <Button className="capitalize" variant="outline">
          outline
        </Button>
        <Button className="capitalize" variant="secondary">
          secondary
        </Button>
      </div>
    </div>
  );
}
