"use client";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import { useState } from "react";

export default function UIDemo() {
  const [dialogShow, setDialogShow] = useState(false);
  return (
    <div>
      <Button onClick={() => {}}>Button</Button>
      <Button onClick={() => {}} primary>
        Primary Button
      </Button>
      <Button onClick={() => {}} disabled>
        Button(Disabled)
      </Button>
      <Button onClick={() => setDialogShow(true)}>Show Dialog</Button>
      <Dialog
        isShow={dialogShow}
        onClose={() => setDialogShow(false)}
        buttons={["Close"]}
        title="Dialog"
      >
        Dialog Content
      </Dialog>
    </div>
  );
}
