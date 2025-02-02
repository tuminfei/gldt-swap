import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { useNft } from "@context/index";

const TransactionDetails = ({
  className = "",
  defaultOpen = false,
}: {
  className?: string;
  defaultOpen?: boolean;
}) => {
  const {
    getSelectedTotalNFTs,
    getSelectedTotalGLDT,
    getSelectedTotalGram,
    getCollectionSelectedNFTs,
  } = useNft();
  const totalNFTs = getSelectedTotalNFTs();
  const totalGram = getSelectedTotalGram();
  const totalGLDT = getSelectedTotalGLDT();
  const selectedNfts = getCollectionSelectedNFTs();

  return (
    <div className={className}>
      <Disclosure as="div" defaultOpen={defaultOpen}>
        <div className="flex items-center justify-between px-2 rounded-xl group-data-[open]:rounded-b-none">
          <div className="flex items-center gap-4">
            <div className="font-medium group-data-[hover]:text-content/80">
              Transaction details
            </div>
          </div>
          <DisclosureButton className="group">
            <ChevronDownIcon className="size-5 group-data-[hover]:fill-content/50 group-data-[open]:rotate-180" />
          </DisclosureButton>
        </div>
        <DisclosurePanel className="bg-surface text-sm/5 mt-4">
          <div className="flex flex-col gap-4 border border-border bg-surface-2 p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between text-content/60">
              <div className="">Amount to be minted</div>
              <div>{totalGLDT.string} GLDT</div>
            </div>
            <div className="border border-border"></div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between text-content/60 font-semibold">
              <div>Total number of NFTs to be swapped</div>
              <div>{totalNFTs.string} GLD NFT</div>
            </div>
            {selectedNfts.map(({ value, totalSelected }, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-center sm:justify-between text-content/60"
              >
                <div>{value}g GLD NFT</div>
                <div>{totalSelected}x</div>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between text-content/60 font-semibold">
              <div>Total grams of gold</div>
              <div>{totalGram.string}g</div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between font-semibold">
              <div>Total</div>
              <div>{totalGLDT.string} GLDT</div>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default TransactionDetails;
