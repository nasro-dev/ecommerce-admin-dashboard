"use client"

import { Store } from "@prisma/client"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useParams ,useRouter} from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>


interface StoreswitcherProps extends PopoverTriggerProps {
   items: Store[]
}

export default function Storeswitcher({
    className,
    items = []
}: StoreswitcherProps) {
  const storeModal = useStoreModal()
  const params = useParams()
  const router = useRouter()

  const formattedItems = items.map((item)=>({
    label: item.name,
    value: item.id
  }))

  const currentStore = formattedItems.find((item) => item.value === params.storeId)

  const [open,setOpen] = useState(false)

  const onStoreSelect = (store: { value: string, label: string}) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button 
                variant="outline" 
                size="sm" 
                role="contains" 
                aria-expanded={open} 
                aria-aria-label="Select a store" 
                className={cn("w-[200px] justify-between", className)}>
                <StoreIcon className="mr-2 h-4 w-4"/>
                {currentStore?.label}      
                <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-30" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-8">
            <Command>
                <CommandList>
                    <CommandInput placeholder="Search store..." />
                    <CommandEmpty>No store found</CommandEmpty>
                    <CommandGroup heading="Stores">
                        {formattedItems.map((store)=>(
                            <CommandItem 
                                key={store.value}
                                onSelect={() => onStoreSelect(store)}
                                className="text-sm"
                            >
                                <StoreIcon className="mr-2 h-4 w-4"/>
                                {store.label} 
                                <Check 
                                    className={cn("ml-auto h-4 w-4",
                                            currentStore?.value === store.value
                                            ? 'opacity-100'
                                            : 'opacity-4'
                                            )}   
                                /> 
                           </CommandItem>
                        ))}

                    </CommandGroup>
                </CommandList>
                <CommandSeparator />
                <CommandList>
                    <CommandGroup>
                        <CommandItem 
                              onSelect={() => {
                                setOpen(false)
                                storeModal.onOpen()
                              }}>
                            <PlusCircle className="mr-2 h-5 w-5"/>
                            Create a new store
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
  )
}
