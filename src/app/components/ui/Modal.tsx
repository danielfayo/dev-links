import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function Modal({ onClick }: { onClick: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-Grey text-base font-normal">Remove</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-White border-none drop-shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-base font-normal leading-6">
            This action cannot be undone. This will permanently delete this link
            from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-none bg-Light-Purple text-base font-semibold rounded-lg">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="py-[0.69rem] px-[1.69rem] bg-Red text-White justify-center text-base font-semibold rounded-lg"
            onClick={onClick}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
