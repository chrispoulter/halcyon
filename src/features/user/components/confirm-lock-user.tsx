import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type ConfirmLockUserProps = {
    onConfirm: () => void;
    loading?: boolean;
    disabled?: boolean;
};

export const ConfirmLockUser = ({
    onConfirm,
    loading,
    disabled
}: ConfirmLockUserProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOk = () => {
        setIsOpen(false);
        onConfirm();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" disabled={loading || disabled}>
                    Lock
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Lock User</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to lock this user account? The
                        user will no longer be able to access the system.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onOk}>Lock</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
