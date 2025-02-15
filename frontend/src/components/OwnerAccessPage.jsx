import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePrintContext } from "../context/PrintContext";

const OwnerAccessPage = () => {
  const { toast } = useToast();
  const [secureCode, setSecureCode] = useState("");
  const { setIsVerified } = usePrintContext();
  const navigate = useNavigate();

  const handleVerification = () => {
    // Simulating backend verification
    if (secureCode === "123456") {
      setIsVerified(true);
      navigate("/print");
    } else {
      toast({
        title: "Error",
        description: "Invalid secure code. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Owner Access
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Enter secure code"
            value={secureCode}
            onChange={(e) => setSecureCode(e.target.value)}
          />
          <Button onClick={handleVerification} className="w-full">
            Verify
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OwnerAccessPage;
