import { useQueryClient } from "@tanstack/react-query";
import { ArrowDownIcon } from "@heroicons/react/20/solid";

import { useNft, useForwardSwapProceed } from "@context/index";

import { Dialog, Button } from "@components/ui";
import TransactionDetails from "../TransactionDetails";

import Pending from "./Pending";
import Success from "./Success";
import Error from "./Error";

const Proceed = () => {
  const {
    getSelectedTotalGLDT,
    getSelectedTotalGram,
    resetState: resetSwapState,
  } = useNft();
  const totalGram = getSelectedTotalGram();
  const totalGLDT = getSelectedTotalGLDT();
  const queryClient = useQueryClient();
  const {
    state: forwardSwapProceedState,
    handleShow,
    handleClose,
    forwardSwap,
    setCanCloseDialog,
  } = useForwardSwapProceed();
  const { show, canCloseDialog } = forwardSwapProceedState;
  const {
    mutate: mutateSwapGLDNFT,
    isSuccess,
    isError,
    isPending,
    isIdle,
  } = forwardSwap;

  const reset = (): void => {
    resetSwapState();
    queryClient.invalidateQueries({
      queryKey: ["USER_FETCH_ACTIVE_SWAPS"],
    });
    queryClient.invalidateQueries({
      queryKey: ["USER_FETCH_NFTS"],
    });
    setCanCloseDialog(true);
  };

  const handleOnClick = () => {
    setCanCloseDialog(false);
    mutateSwapGLDNFT(undefined, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <>
      <Button
        onClick={handleShow}
        className={`rounded-xl w-full py-3`}
        disabled={!totalGLDT}
      >
        Proceed to swap
      </Button>
      <Dialog
        show={show}
        handleClose={handleClose}
        enableClose={canCloseDialog}
      >
        <div className="px-6 pt-6 pb-12">
          {isIdle && (
            <>
              <div className="px-6 mb-8 text-center">
                You are sending{" "}
                <span className="font-semibold text-gold">
                  {totalGram.string} GLD NFTs
                </span>{" "}
                and will receive{" "}
                <span className="font-semibold text-gold">
                  {totalGLDT.string} GLDT.
                </span>
              </div>
              <div className="flex flex-col items-center gap-6 border border-border bg-surface-2 p-6 rounded-xl">
                <div className="font-semibold">{totalGram.string}g of gold</div>

                <div className="w-full flex justify-center items-center py-4">
                  <div className="relative w-full">
                    <div className="border-t border-border w-full"></div>
                    <div className="absolute inset-x-0 top-0 flex justify-center transform -translate-y-1/2">
                      <button className="bg-content text-background rounded-full p-2 cursor-default">
                        <ArrowDownIcon
                          height={24}
                          width={24}
                          className="text-gold"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="font-semibold">{totalGLDT.string} GLDT</div>
              </div>

              <TransactionDetails className="w-full mt-8" />

              <div className="text-center mt-8">
                <Button onClick={handleOnClick}>Confirm</Button>
              </div>
            </>
          )}
          {isPending && <Pending />}
          {isSuccess && <Success />}
          {isError && <Error />}
        </div>
      </Dialog>
    </>
  );
};

export default Proceed;
