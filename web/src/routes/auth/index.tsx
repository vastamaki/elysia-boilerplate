import { AuthView } from "@daveyplate/better-auth-ui";
import { useParams } from "react-router";
import { Card, CardContent } from "src/components/ui/card";

export default function AuthPage() {
  const params = useParams();
  const pathname = params["*"];

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <AuthView pathname={pathname} />
      </CardContent>
    </Card>
  );
}
