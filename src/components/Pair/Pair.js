import React from 'react';
import Word from './Word'
import './Pair.css'
import checkmark from '../../icons/checkmark.svg'
import deleteIcon from '../../icons/delete.svg'

const Pair = ( props ) => {

   return (
    <div
      className="pair"
    >
      <form >
         <Word
           value={props.pair.left}
           onEdit={props.setEdit}
           toggleEdit={props.toggleEdit}
           onChange={(e) => props.saveChanges(e, props.pair.id, 'left')}
           editMode={props.editMode}
         />
         <Word
         value={props.pair.right}
         onEdit={props.setEdit}
         toggleEdit={props.toggleEdit}
         onChange={(e) => props.saveChanges(e, props.pair.id, 'right')}
         editMode={props.editMode}
         />

         {props.editMode &&
           <div
              type='submit'
              onClick={props.toggleEdit}>
              <img src={checkmark} alt='save'/>
            </div>
          }
       </form>

      <div
        onClick={props.onDelete}
      >
        <img src={deleteIcon} alt='delete'/>
      </div>

    </div>
  )
}
export default Pair;
