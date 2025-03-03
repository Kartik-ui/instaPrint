import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/config/config";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePrintContext } from "../context/PrintContext";

const OwnerAccessPage = () => {
  const { toast } = useToast();
  const { uniqueCode } = useParams();
  const [secureCode, setSecureCode] = useState("");
  const [isValidCode, setIsValidCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setIsVerified } = usePrintContext();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUniqueCode = async () => {
      try {
        const response = await fetch(`${API_URL}/validate-link/${uniqueCode}`);
        const data = await response.json();
        if (data.success) {
          setIsValidCode(true);
        } else {
          setIsValidCode(false);
        }
      } catch (error) {
        setIsValidCode(false);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    };

    verifyUniqueCode();
  }, [uniqueCode, toast]);

  const handleVerification = async () => {
    if (!secureCode.trim()) {
      toast({
        title: "Error",
        description: "Enter a secure code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/validate-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uniqueId: uniqueCode, secureCode }),
      });

      const data = await response.json();

      if (data.success) {
        setIsVerified(true);
        toast({
          title: "Success",
          description: "Access granted!",
          variant: "success",
        });
        navigate("/print");
      } else {
        setIsVerified(false);
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsVerified(false);
      toast({
        title: "Error",
        description: error.message || error.data.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isValidCode === false) {
    return (
      <div className="text-center mt-10 text-red-600">Invalid access link.</div>
    );
  }

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
            disabled={loading || isValidCode === null}
          />
          <Button
            onClick={handleVerification}
            className="w-full"
            disabled={loading || isValidCode === null}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OwnerAccessPage;
