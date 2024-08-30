import { LoaderSpin } from "@components/ui";

import { useGetUserNftsMetrics } from "@hooks/gld_nft";

const CardNFT = ({
  valueNFT,
  countNFT,
  className,
}: {
  valueNFT: number;
  countNFT: number;
  className?: string;
}) => {
  return (
    <div className={className}>
      <div className="border border-border bg-surface-2 p-6 rounded-xl">
        <div className="flex justify-center sm:justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gold text-white rounded-md px-2 font-semibold">
              {countNFT}
            </div>
            <img className="flex-none h-16" src={`/gold-bars/${1}g.png`} />
            <div className="font-semibold text-2xl">{valueNFT}g</div>
          </div>
          {/* <div></div> */}
        </div>
      </div>
    </div>
  );
};

const YourNfts = ({ className }: { className?: string }) => {
  const { data, isSuccess, isLoading, isError } = useGetUserNftsMetrics();

  return (
    <div className={className}>
      <div className="border border-border bg-surface-1 p-6 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <div className="mb-4">Your NFTs</div>
          <div></div>
        </div>
        {isSuccess && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {data?.nfts.map(({ valueNFT, countNFT }) => (
              <CardNFT key={valueNFT} valueNFT={valueNFT} countNFT={countNFT} />
            ))}
          </div>
        )}

        {(isLoading || isError) && (
          <div className="flex justify-center">
            <LoaderSpin />
          </div>
        )}
      </div>
    </div>
  );
};

export default YourNfts;
