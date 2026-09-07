
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "./confirm-modal";


export default function DeleteAlert() {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setOpen(true)}
      >
        Delete Alert
      </Button>

      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      // loading={true}
      />
    </>
  );
}