import React, { useState } from 'react';
import Word from './Word'
import './Pair.css'
import checkmark from '../../icons/checkmark.svg'
import deleteIcon from '../../icons/delete.svg'

const Pair = (props) => {

  const [edit, setEdit] = useState(false)

  return (
    <div className='pair-outer'>
      {edit &&
           <button
           onClick={props.setGap}
           >
             {props.pair.type === 'gap' ? 'Word' : 'Gap'}
           </button>
      }
      <div
        className='pair'
      >

        <form >
          <Word
            order='left'
            pair={props.pair}
            wordValue={props.pair.left}
            type={props.pair.type}
            editMode={edit}
            setEdit={() => setEdit(!edit)}
            onChange={(e) => props.saveChanges(e, props.pair.id, 'left')}
            selectGap={props.selectGap}
          />

          <Word
            order='right'
            pair={props.pair}
            wordValue={props.pair.right}
            type={props.pair.type}
            editMode={edit}
            setEdit={() => setEdit(!edit)}
            onChange={(e) => props.saveChanges(e, props.pair.id, 'right')}
          />

           {edit &&
             <div
                type='submit'
                onClick={() => setEdit(!edit)}>
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
    </div>
  )
}
export default Pair;
