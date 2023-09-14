'use client'

import { DragDropContext, DragDropContextProps } from "react-beautiful-dnd"

const DragContext = ({children, onDragEnd}:DragDropContextProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  )
}

export default DragContext