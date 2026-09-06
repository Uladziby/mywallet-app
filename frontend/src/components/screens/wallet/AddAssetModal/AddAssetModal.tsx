import ActionsModal from '@/src/components/screens/wallet/AddAssetModal/ModalComponents/ActionsModal'
import AddAssetForm, {
	IAddAssetFormData
} from '@/src/components/screens/wallet/AddAssetModal/ModalComponents/AddAssetForm'
import HeaderModal from '@/src/components/screens/wallet/AddAssetModal/ModalComponents/HeaderModal'
import ModalLayout from '@/src/components/screens/wallet/AddAssetModal/ModalLayout'
import { AddAssetModalProps } from '@/src/components/screens/wallet/types'
import { SubmitHandler, useForm } from 'react-hook-form'

export const AddAssetModal = ({
	visible,
	onClose,
	onAdd
}: AddAssetModalProps) => {
	const { control, reset, handleSubmit } = useForm<IAddAssetFormData>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IAddAssetFormData> = (
		data: IAddAssetFormData
	) => {
		onAdd(data)
		reset()
		onClose()
	}

	return (
		<ModalLayout visible={visible} onClose={onClose}>
			<HeaderModal title='Add New Asset' onClose={onClose} />
			<AddAssetForm control={control} />
			<ActionsModal
				name='Add Asset'
				onClose={onClose}
				onAdd={handleSubmit(onSubmit)}
			/>
		</ModalLayout>
	)
}
