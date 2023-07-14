import { useContext, useState } from "react";
import { generateFontLink, generateFontImport } from "utils";
import { AppContext } from "contexts/AppContext";

const LinkUseOnTheWeb = () => {
  const [selectedOption, setSelectedOption] = useState("Link");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const appContext = useContext(AppContext);
  const { selectedFamily } = appContext!;

  return (
    <>
      {selectedFamily && (
        <div>
          <div className="text-[14px] font-medium text-[#e8eaed] mb-6">
            Use on the web
          </div>
          <div className="text-[14px] font-medium text-[#e8eaed]">
            To embed a font, copy the code into the &lt;head&gt; of your html
          </div>
          <>
            <div className="flex items-center space-x-6 justify-center mt-5">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Link"
                  checked={selectedOption === "Link"}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                &lt;link&gt;
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Import"
                  checked={selectedOption === "Import"}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                @import
              </label>
            </div>
            {selectedOption === "Link" && (
              <div className="mt-3 bg-[#3c3d40] p-2 break-all">
                &lt;link rel="preconnect"
                href="https://fonts.googleapis.com"&gt; <br />
                &lt;link rel="preconnect" href="https://fonts.gstatic.com"
                crossorigin&gt; <br />
                {generateFontLink(selectedFamily)}
              </div>
            )}
            {selectedOption === "Import" && (
              <div className="mt-3 bg-[#3c3d40] p-2 break-all">
                &lt;style&gt; <br />
                {generateFontImport(selectedFamily)} <br />
                &lt;/style&gt;
              </div>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default LinkUseOnTheWeb;
