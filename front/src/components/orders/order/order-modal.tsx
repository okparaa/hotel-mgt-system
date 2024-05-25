import { Check, Save, X } from "lucide-react";
import { AddInput } from "../../../lib/add-input";
import FormModal from "../../../lib/form-modal";
import { toCommas, ucwords } from "../../../lib/utils";
import { useRecoverMutation } from "../../aio-urql";
import { useChest } from "../../../app-chest";
type OrderModalProps = {
  open: boolean;
  onClose: () => void;
  balance: number;
  guest: string;
};

export const OrderModal = ({
  open,
  onClose,
  balance,
  guest,
}: OrderModalProps) => {
  const [_recoverMutateRes, recoverMutate] = useRecoverMutation();
  const {
    data: { booker, session },
    updateChest,
  } = useChest();
  const total = booker.cash + booker.pos + booker.txfa;
  return (
    <FormModal
      isOpen={open}
      onClose={() => onClose()}
      className="p-4 rounded-xl shadow-xl backdrop:bg-gray-800 backdrop:bg-opacity-45 w-[425px]"
    >
      <div className="font-semibold p-0">
        Receive: <span className="naira">{toCommas(balance)}</span>
      </div>
      from <span className="">{ucwords(guest)}</span>
      <div className="flex border-2 border-slate-600 py-2 mt-2 rounded-md">
        <div className="flex-1 text-center checkout">
          <span>Cash</span>
          <span className="cursor-text border-black flex w-10/12 m-auto justify-center items-center h-10">
            <AddInput
              id={booker.hash}
              initialValue={booker.cash}
              action={(value) => {
                updateChest({
                  type: "booker",
                  data: {
                    ...booker,
                    cash: +value,
                  },
                });
              }}
            />
          </span>
        </div>
        <div className="flex-1 text-center">
          <span>POS</span>
          <span className="cursor-text border-black flex w-10/12 h-10 m-auto justify-center items-center">
            <AddInput
              id={booker.hash}
              initialValue={booker.pos}
              action={(value) => {
                updateChest({
                  type: "booker",
                  data: {
                    ...booker,
                    pos: +value,
                  },
                });
              }}
            />
          </span>
        </div>
        <div className="flex-1 text-center">
          <span>Txfer</span>
          <span className="cursor-text border-black flex w-10/12 h-10 m-auto justify-center items-center">
            <AddInput
              id={booker.hash}
              initialValue={booker.txfa}
              action={(value) => {
                updateChest({
                  type: "booker",
                  data: {
                    ...booker,
                    txfa: +value,
                  },
                });
              }}
            />
          </span>
        </div>
        <div className="flex-1 text-center">
          <span>Total</span>
          <span className="bg-slate-600 text-white relative font-semibold border border-black flex w-20 h-10 m-auto justify-center items-center rounded-md">
            {toCommas(total)}
            {total !== booker.total ? (
              <X className="absolute text-white bg-red-700 rounded-full inline-flex h-4 w-4 -right-2 -top-2" />
            ) : (
              <Check className="absolute text-white bg-red-700 rounded-full inline-flex h-4 w-4 -right-2 -top-2" />
            )}
          </span>
        </div>
      </div>
      <div className="p-1 text-[16px] gap-10 flex justify-center mt-3">
        <button
          onClick={async () => {
            try {
              await recoverMutate({
                recovery: {
                  pos: booker.pos,
                  txfa: booker.txfa,
                  cash: booker.cash,
                  userId: session.id,
                  orderId: booker.orderId,
                  hash: booker.hash,
                },
              });
            } catch (error) {}
          }}
          className="px-4 shadow-md pb-0 outline-1 bg-slate-600 text-white border text-lg flex items-center gap-2 rounded-full"
        >
          <Save />
          <span className="pb-[3px]">save</span>
        </button>
      </div>
    </FormModal>
  );
};
