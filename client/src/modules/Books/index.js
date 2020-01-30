import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Input, Rating } from 'semantic-ui-react'
import sortBy from 'lodash/sortBy'
import includes from 'lodash/includes'
import omit from 'lodash/omit'
import { deleteBook } from '../../flux/actions'
import Modal from '../Modals'

function Books ({
  books,
  deleteBook,
  initialSearchQuery
}) {
  useEffect(() => {
    setData(books)
  }, [books])

  useEffect(() => {
    if (initialSearchQuery !== '') {
      handleSearch()
    }
  }, [])

  const [data, setData] = useState(books)
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
    for (const book of books) {
      const validFields = {
        title: book.title,
        author: book.author.name,
        genre: book.genre
      }
      for (const objVal of Object.values(validFields)) {
        if (includes(objVal.toLowerCase(), searchQuery.toLowerCase())) {
          newData.push(book)
          break
        }
      }
    }
    setData(newData)
  }

  function handleSearchChange (e, { value }) {
    if (value === '') {
      setData(books)
    }
    setSearchQuery(value)
  }

  return (
    <div>
      <Table sortable striped celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='5'>
              <Modal.AddBook />
              <Input
                action={{
                  icon: 'search',
                  onClick: () => handleSearch()
                }}
                placeholder='Поиск...'
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Действия</Table.HeaderCell>
            <Table.HeaderCell
              sorted={useSort('book')}
              onClick={handleSort('book')}
            >
              Название
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={useSort('author')}
              onClick={handleSort('author')}
            >
              Автор
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={useSort('genre')}
              onClick={handleSort('genre')}
            >
              Жанр
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={useSort('rating')}
              onClick={handleSort('rating')}
            >
              Рейтинг
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(book => (
            <Table.Row key={book.book_id}>
              <Table.Cell collapsing>
                <Button
                  icon='remove'
                  alt='Удалить'
                  onClick={() => deleteBook(book)}
                />
                <Modal.EditBook oldData={book} />
                <Modal.InfoBook book={book} />
              </Table.Cell>
              <Table.Cell>
                {book.title}
              </Table.Cell>
              <Table.Cell>
                {book.author.name}
              </Table.Cell>
              <Table.Cell>
                {book.genre}
              </Table.Cell>
              <Table.Cell collapsing>
                <Rating
                  disabled
                  icon='star'
                  rating={book.rating}
                  maxRating={5}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = state => ({
  books: state.books,
  initialSearchQuery: state.tabs.searchQuery
})

const mapDispatchToProps = dispatch => ({
  deleteBook: (book) => dispatch(deleteBook(book))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Books)
