import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Gender } from '../../../types';
// import MaleIcon from '@mui/icons-material/Male';
// import FemaleIcon from '@mui/icons-material/Female';
import DeleteIcon from '@mui/icons-material/Delete';

export type AddPlayerRowProps = {
   name: string;
   gender: Gender;

   onChangeName: (value: string) => void;
   onChangeGender: (value: Gender) => void;
   onRemove: () => void;

   onPressEnter: () => void;

   textFieldProps?: TextFieldProps;
};

function AddPlayerRow({ name, onChangeName, onRemove, textFieldProps }: AddPlayerRowProps) {
   // const handleClickGenderButton = () => onChangeGender(gender === 'male' ? 'female' : 'male');

   return (
      <TextField
         fullWidth
         size="small"
         value={name}
         onChange={(ev) => onChangeName(ev.target.value)}
         InputProps={{
            // startAdornment: (
            //    <InputAdornment position="start">
            //       <IconButton onClick={handleClickGenderButton} color="primary">
            //          {gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
            //       </IconButton>
            //    </InputAdornment>
            // ),
            endAdornment: (
               <InputAdornment position="end">
                  <IconButton onClick={onRemove}>
                     <DeleteIcon />
                  </IconButton>
               </InputAdornment>
            ),
         }}
         {...textFieldProps}
      />
   );
}

export default AddPlayerRow;
