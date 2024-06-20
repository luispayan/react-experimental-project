import { useState } from 'react';
import { createProduct, updateProduct } from '../services/api';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Form from '@radix-ui/react-form';
import '../styles/ProductForm.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ProductForm = ({
    action = 'create',
    data = {},
    onAction = () => null,
    className = ''
}) => {
    const id = data.id || null;
    const [name, setName] = useState(data.name || '');
    const [inventory, setInventory] = useState(data.inventory || 0);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = { name, inventory };
            console.log(data);
            const response = action == 'create' ? await createProduct(data) : await updateProduct(id, data);
            console.log(response);
            withReactContent(Swal).fire({
                title: `Product ${action}d successfully`,
                icon: 'success'
            });
            console.log(response.data)
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: `An error occurred while trying to ${action} product`,
                icon: 'error'
            });
            console.error(`Error trying to ${action} product:`, error);
        } finally {
            setName('');
            setInventory(0);
            onAction();
            setOpen(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button className={`${className} Button !w-20 rounded-lg capitalize`}>{action}</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle capitalize">{action} Product</Dialog.Title>
                    <Dialog.Description />
                    <Form.Root onSubmit={handleSubmit} className="FormRoot self-center !w-full mx-auto h-fit bg-white p-4">
                        <Form.Field className="FormField" name="email">
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                                <Form.Label className="FormLabel text-black">Name</Form.Label>
                                <Form.Message className="FormMessage text-red-500" match="valueMissing">
                                    Please enter product name
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <input
                                    className="Input bg-white text-black"
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    value={name}
                                    required
                                />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field className="FormField" name="question">
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                                <Form.Label className="FormLabel text-black">Inventory Amount</Form.Label>
                                <Form.Message className="FormMessage text-red-500" match="valueMissing">
                                    Please enter product inventory
                                </Form.Message>
                                <Form.Message className="FormMessage" match="typeMismatch">
                                    Please provide a valid inventory amount
                                </Form.Message>
                            </div>
                            <Form.Control asChild>
                                <input
                                    type="number"
                                    className='Input bg-white text-black'
                                    onChange={(e) => setInventory(e.target.value)}
                                    value={inventory}
                                    required
                                />
                            </Form.Control>
                        </Form.Field>
                        <Form.Submit asChild>
                            <button className="Button capitalize bg-red-500 hover:bg-red-700 text-white" style={{ marginTop: 10 }}>
                                {action}
                            </button>
                        </Form.Submit>
                    </Form.Root>
                    <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                        <Cross2Icon />
                    </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
};

export default ProductForm;