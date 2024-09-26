import { useAuth } from "@context/auth";
import { Dialog, LoaderSpin } from "@components/ui";

const ConnectingDialog = () => {
  const { state: authState } = useAuth();
  const { isConnecting } = authState;

  return (
    <>
      <Dialog show={isConnecting} enableClose={false} handleClose={() => null}>
        <div className="pt-6 pb-12 px-4 text-center">
          <div className="mb-8 font-semibold text-lg">Connecting...</div>
          <div className="flex items-center justify-center">
            <LoaderSpin />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConnectingDialog;
