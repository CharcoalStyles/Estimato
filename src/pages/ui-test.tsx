import React from "react";
import { Button, sizes as bSizes, variants as bVariants } from "../components/ui/Button";
import { Text, fontTypes, sizes as tSizes, variants as tVariants } from "../components/ui/Text";

const UITestPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white">UI Test Page</h1>

      <h2 className="text-2xl font-bold text-white">Buttons</h2>
      {bVariants.map((variant) => (
        <div className="flex flex-row my-4">
          {bSizes.map((size) => (
            <div className="flex mx-1">
              <Button
                label={`${variant} ${size}`}
                variant={variant}
                size={size}
              />
            </div>
          ))}
        </div>
      ))}

      <h2 className="text-2xl font-bold text-white">Text</h2>
      {tVariants.map((variant) => (
        <div className="flex flex-row my-4">
          {tSizes.map((size) => (
            <div className="flex mx-1">
              {fontTypes.map((fontType) => (
                <div className="flex mx-1">
                  <Text
                    variant={variant}
                    fontSize={size}
                    fontType={fontType}
                  >{`${variant} ${size} ${fontType}`}</Text>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UITestPage;
