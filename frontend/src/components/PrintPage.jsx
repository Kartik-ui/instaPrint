import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/config/config";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { usePrintContext } from "../context/PrintContext";

const PrintPage = () => {
  const { toast } = useToast();
  const { uploadedFile, isVerified } = usePrintContext();
  const [prints, setPrints] = useState(1);
  const [copies, setCopies] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/get-prints/${uniqueLink}`);
    };
  }, []);

  if (!isVerified) {
    return <div>Access denied. Please verify your secure code.</div>;
  }

  const handlePrint = () => {
    if (!uploadedFile) {
      toast({
        title: "Error",
        description: "No file available for printing!",
        variant: "destructive",
      });
      return;
    }

    // Create an invisible iframe for direct printing
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = uploadedFile; // Cloudinary file URL
    document.body.appendChild(iframe);

    // Wait for the document to load and then print
    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      document.body.removeChild(iframe);

      toast({
        title: "Success",
        description: `Printing ${prints} print(s) with ${copies} copy(ies) each.`,
      });
    };
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Print Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="prints"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Prints
            </label>
            <Input
              id="prints"
              type="number"
              min="1"
              value={prints}
              onChange={(e) => setPrints(Number(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="copies"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Copies
            </label>
            <Input
              id="copies"
              type="number"
              min="1"
              value={copies}
              onChange={(e) => setCopies(Number(e.target.value))}
            />
          </div>
          <Button onClick={handlePrint} className="w-full">
            Print
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrintPage;
