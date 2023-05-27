import { applyServerAction } from "@/libs/CDKEYApi";
import { useState } from "react";
import Dialog from "./Dialog";
import Input from "./Input";

export default function CDKEYDialog({
  onClose,
  isShow,
}: {
  onClose(): unknown;
  isShow: boolean;
}) {
  function _onClose() {
    if (loading) return;
    else onClose();
  }
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  async function applyKey() {
    if (loading) return;
    setLoading(true);
    setErrorMessage("");
    const result = await applyServerAction(inputValue);
    if (result !== true) {
      setErrorMessage(result as string);
    } else {
      setShowSuccessDialog(true);
      onClose();
    }
    setLoading(false);
  }
  return (
    <>
      <Dialog
        isShow={isShow}
        onClose={_onClose}
        title="兑换码"
        buttons={["使用兑换码", "取消"]}
        onButtonClick={(i) => {
          if (i === 0) {
            applyKey();
          } else {
            _onClose();
          }
        }}
        disableButtons={loading}
      >
        <Input
          value={inputValue}
          onChange={(v) => setInputValue(v)}
          disabled={loading}
          hint={errorMessage}
        ></Input>
      </Dialog>
      <Dialog
        isShow={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        buttons={["确定"]}
      >
        兑换成功
      </Dialog>
    </>
  );
}
