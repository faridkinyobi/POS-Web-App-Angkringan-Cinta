"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import {
    useAddInventoryInOut,
} from "@/features";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { IzInOutInventory, IzStatusEnumInventory, SchemaInOutInventory } from "@/schema";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

export default function FormInOutInventory({
    id = "",
    statusType = "INIT",
}: { id?: string; statusType?: IzStatusEnumInventory }) {

    const form = useForm<IzInOutInventory>({
        resolver: zodResolver(SchemaInOutInventory) as any,
        mode: "onTouched",
        defaultValues: {
            id: id || "",
            qty: 0,
            status: statusType
        }
    });

    const { control, handleSubmit, getValues } = form;
    console.log(getValues('id'))
    console.log(getValues('status'))
    // QUERY
    const { mutate, isPending } = useAddInventoryInOut()

    const onSubmit = (data: IzInOutInventory) => {
        mutate(data);

    };

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit, (err) => console.log(err, 'onSubmit'))}
                className="grid grid-cols-1 gap-12.5 px-6 py-10"
            >
                <FormField
                    control={control}
                    name="qty"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Input stock"
                                    type="text"
                                    onChange={(e) =>
                                        field.onChange(Math.max(0, Number(e.target.value) || 0))
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" formNoValidate>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="cursor-pointer "
                    >
                        Save
                        {isPending && <LoaderCircle className="animate-spin" />}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
