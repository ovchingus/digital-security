import React, { useEffect, useState, useRef, createRef } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Input } from 'semantic-ui-react'
import _ from 'lodash'
import { deleteAuthor } from '../../flux/actions'
import Modal from '../Modals'

function Authors ({
  authors,
  getAuthors,
  deleteAuthor
}) {
  useEffect(() => {
    setData(authors)
  }, [authors])

  const [data, setData] = useState(authors)
  const [sort, setSort] = useState({ direction: null, column: null })

  const handleSort = (clickedColumn) => () => {
    if (sort.column !== clickedColumn) {
      setSort({
        direction: 'ascending',
        column: clickedColumn
      })
      setData(_.sortBy(data, [clickedColumn]))
      return
    }
    setData(data.reverse())
    setSort(sort.direction === 'ascending' ? 'descending' : 'ascending')
  }

  function useSort (cellName) {
    return cellName === sort.column ? sort.direction : null
  }

  function handleSearch (e, { value }) {
    const newData = []
    for (const author of data) {
      for (const objVal of Object.values(author)) {
        if (_.includes(objVal, value)) {
          newData.push(author)
          break
        }
      }
    }
    value.length > 0 ? setData(newData) : setData(authors)
  }

  const elementsRef = useRef(data.map(() => createRef()))
  console.log(elementsRef)
  return (
    <div>
      <Table sortable striped celled selectable ref={elementsRef.current[0]}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Modal.AddAuthor />
              <Input
                icon='search'
                placeholder='Поиск...'
                onChange={handleSearch}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Действия</Table.HeaderCell>
            <Table.HeaderCell
              sorted={useSort('author')}
              onClick={handleSort('author')}
            >
              Автор
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={useSort('description')}
              onClick={handleSort('description')}
            >
              Описание
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((author, idx) => (
            <Table.Row ref={elementsRef[idx]} key={author.author_id}>
              <Table.Cell collapsing>
                <Button
                  icon='remove'
                  alt='Удалить'
                  onClick={() => deleteAuthor(author)}
                />
                <Modal.EditAuthor oldData={author} />
                <Modal.InfoAuthor author={author} />
              </Table.Cell>
              <Table.Cell>
                {author.name}
              </Table.Cell>
              <Table.Cell>
                {author.description}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = state => ({
  authors: state.authors
})

const mapDispatchToProps = dispatch => ({
  deleteAuthor: (author) => dispatch(deleteAuthor(author))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authors)
