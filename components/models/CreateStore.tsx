"use client"
import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'
import * as z from "zod" 
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {  Form, 
          FormControl, 
          FormField, 
          FormItem, 
          FormLabel,
          FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
const formSchema = z.object({
    name: z.string().min(1),

})

const CreateStore = () => {
  const storeModal = useStoreModal()
  const [loading, setLoading] = useState()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
    },
  })
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
   try {
    setLoading(true)
    const respone = await axios.post('/api/stores', values)
    toast.success("Store successfully created")
   } catch (error) {
    toast.error("Something went wrong.")
   }
   finally{
    setLoading(false)
   }
  }

  return (
    <Modal  
        title='Create Store' 
        description='Add a new store'
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}>
        <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} name="name" render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="My Store" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                     )}/>
                     <div className='pt-6 space-x-2 flex items-center justify-end'>
                        <Button disabled={loading} variant='outline' onClick={storeModal.onClose}>Cancel</Button>
                        <Button disabled={loading} type="submit">Continue</Button>
                     </div>
                </form>

            </Form>
        </div>
    </Modal>
  )
}

export default CreateStore