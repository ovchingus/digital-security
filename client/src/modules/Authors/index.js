import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Input } from 'semantic-ui-react'
import sortBy from 'lodash/sortBy'
import includes from 'lodash/includes'
import omit from 'lodash/omit'
import { deleteAuthor } from '../../flux/actions'
import Modal from '../Modals'

function Authors ({
  authors,
  getAuthors,
  deleteAuthor,
  initialSearchQuery
}) {
  useEffect(() => {
    setData(authors)
  }, [authors])

  useEffect(() => {
    if (initialSearchQuery !== '') {
      handleSearch()
    }
  }, [])

  const [data, setData] = useState(authors)
  const [sort, setSort] = useState({ direction: null, column: null })

  const handleSort = (clickedColumn) => () => {
    if (sort.column !== clickedColumn) {
      setSort({
        direction: 'ascending',
        column: clickedColumn
      })
      setData(sortBy(data, [clickedColumn]))
      return
    }
    setData(data.reverse())
    setSort(sort.direction === 'ascending' ? 'descending' : 'ascending')
  }

  function useSort (cellName) {
    return cellName === sort.column ? sort.direction : null
  }

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)

  function handleSearch () {
    const newData = []
    for (const author of data) {
      const validFields = omit(author, 'author_id')
      for (const objVal of Object.values(validFields)) {
        if (includes(objVal.toLowerCase(), searchQuery.toLowerCase())) {
          newData.push(author)
          break
        }
      }
    }
    searchQuery.length > 0 ? setData(newData) : setData(authors)
  }

  return (
    <div>
      <Table sortable striped celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Modal.AddAuthor />
              <Input
                action={{
                  icon: 'search',
                  onClick: () => handleSearch()
                }}
                placeholder='Поиск...'
                value={searchQuery}
                onChange={(e, { value }) => setSearchQuery(value)}
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
            <Table.Row key={author.author_id}>
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
  authors: state.authors,
  initialSearchQuery: state.tabs.searchQuery
})

const mapDispatchToProps = dispatch => ({
  deleteAuthor: (author) => dispatch(deleteAuthor(author))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authors)
