import { createContext, useContext, useState } from "react";

const PrintContext = createContext();

export const usePrintContext = () => useContext(PrintContext);

export const PrintProvider = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uniqueLink, setUniqueLink] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  return (
    <PrintContext.Provider
      value={{
        uploadedFile,
        setUploadedFile,
        uniqueLink,
        setUniqueLink,
        isVerified,
        setIsVerified,
      }}
    >
      {children}
    </PrintContext.Provider>
  );
};
