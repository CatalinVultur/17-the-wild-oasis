import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin.js";
import { useEditCabin } from "./useEditCabin.js";

import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow.jsx";

const Error = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const {
        register,
        handleSubmit,
        reset, getValues,
        formState
    } = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const { errors } = formState;

    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();

    const isWorking = isCreating || isEditing;

    function onSubmit(data) {
        const image = typeof data.image === 'string' ? data.image : data.image[0];

        if (isEditSession) editCabin({ newCabinData: {...data, image}, id: editId }, {
            onSuccess: () => {
                reset()
                onCloseModal?.()
            }
        });
        else createCabin({ ...data, image }, {
            onSuccess: () => {
                reset();
                onCloseModal?.()
            }
        });
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            type={ onCloseModal ? 'modal' : 'regular' }
        >
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register('name', {
                        required: "This field is required"
                    })}
                />
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register('maxCapacity', {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1'
                        }
                    })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register('regularPrice', {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1'
                        }
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    defaultValue={0}
                        {...register('discount', {
                        required: "This field is required",
                        validate: (value) => value <= getValues().regularPrice || 'Discount should be less than the regular price'
                    })}
                />
            </FormRow>

            <FormRow label="Description for website" error={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    disabled={isWorking}
                    defaultValue=""
                    {...register('description', {
                        required: "This field is required"
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    disabled={isWorking}
                    accept="image/*"
                    {...register('image', {
                        required: isEditSession ? false : "This field is required"
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={ isWorking }>
                    {isEditSession ? 'Edit cabin' : 'Create new cabin'}
                </Button>
            </FormRow>
            <Error />
        </Form>
    );
}

export default CreateCabinForm;
