"use client";

import { useTranslation } from "next-i18next";

const WhyInfos: React.FC = () => {
  const { t } = useTranslation("why");

  return (
    <>
      {/* Section Title and Description */}
      <div className="flex flex-col md:flex-row w-full 2xl:max-h-96 border-y border-secondary">
        <div className="md:w-1/2 content-center border-b md:border-0 border-secondary">
          <p className="text-[30px] text-center justify-center">
            <span className="font-bold">{t("titleBold")} </span>
            {t("titleRegular")}
          </p>
        </div>
        <div className="hidden md:block border-r w-0.5 border-secondary"></div>
        <div className="md:w-1/2 content-center">
          <p className="my-8 md:my-4 text-[16px] text-center justify-center w-3/4 mx-auto">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Section Features */}
      <div className="w-full flex flex-col md:flex-row mb-8 border-b border-secondary">
        {["decentralized", "ownership", "crossChain", "audited"].map((feature, index) => (
          <>
            <div
              key={feature}
              className="font-sans text-2xl font-semibold leading-[32px] text-secondary bg-black md:w-1/4 text-center py-2"
            >
              {t(`features.${feature}`)}
            </div>
            {index < 3 && <div className="border-b md:border-r w-[1px] border-secondary"></div>}
          </>
        ))}
      </div>
    </>
  );
};

export default WhyInfos;
