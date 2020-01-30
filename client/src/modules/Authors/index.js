import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Input, Pagination } from 'semantic-ui-react'
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

  /**
   * Sorting
   */

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
    setSort({
      ...sort,
      direction: sort.direction === 'ascending' ? 'descending' : 'ascending'
    })
  }

  function useSort (cellName) {
    return cellName === sort.column ? sort.direction : null
  }

  /**
   * Searching
   */

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)

  function handleSearch () {
    const newData = []
    for (const author of authors) {
      const validFields = omit(author, 'author_id')
      for (const objVal of Object.values(validFields)) {
        if (includes(objVal.toLowerCase(), searchQuery.toLowerCase())) {
          newData.push(author)
          break
        }
      }
    }
    setData(newData)
  }

  function handleSearchChange (e, { value }) {
    if (value === '') {
      setData(authors)
    }
    setSearchQuery(value)
  }

  /**
   * Pagination
   */

  const authorsOnPage = 8
  const pagesCount = Math.ceil(data.length / authorsOnPage)
  const [page, setPage] = useState(1)

  function getPageData (activePage) {
    return data.slice(
      (activePage - 1) * authorsOnPage,
      activePage * authorsOnPage
    )
  }

  function handleChangePage (e, { activePage }) {
    setPage(activePage)
  }

  const isLastPage = page === pagesCount
  const mockForLastPage = Array(pagesCount * authorsOnPage - data.length).fill(1)

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
                onChange={handleSearchChange}
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
          {isLastPage &&
          mockForLastPage.map((author, idx) => (
            <Table.Row key={idx}>
              <Table.Cell>
                <Button
                  icon='remove'
                  disabled
                />
                <Button
                  icon='edit'
                  disabled
                />
                <Button
                  icon='info'
                  disabled
                />
              </Table.Cell>
              <Table.Cell />
              <Table.Cell />
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Pagination
                firstItem={null}
                lastItem={null}
                activePage={page}
                onPageChange={handleChangePage}
                totalPages={pagesCount}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
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
