import React from 'react'

function Gap(props) {

  const selectGap = (e) => {
      if (props.editMode && props.selectGap) {
          props.selectGap(e, props.pairId, props.index)
      }
  };

    let div = <>
        <div onClick={selectGap}>
            {props.value}
        </div>
    </>;
    return div
}
export default Gap;
