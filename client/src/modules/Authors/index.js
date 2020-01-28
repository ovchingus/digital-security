import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Input } from 'semantic-ui-react'
import _ from 'lodash'
import { getAuthors } from '../../flux/actions'

function Authors ({ authors, getAuthors }) {
  useEffect(() => {
    getAuthors()
  }, [])

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

  return (
    <div>
      <Table sortable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Button
                floated='right'
                primary
                size='small'
              >
                Добавить автора
              </Button>
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
          {data.map(({ author_id: id, name, description }) => (
            <Table.Row key={id}>
              <Table.Cell collapsing>
                <Button.Group basic size='small'>
                  <Button icon='edit' alt='Редактировать' />
                  <Button icon='remove' alt='Удалить' />
                </Button.Group>
              </Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        {/* <Table.Footer>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan='3'>
              <Button
                floated='right'
                primary
                size='small'
              >
                Добавить автора
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer> */}
      </Table>
    </div>
  )
}

const mapStateToProps = state => ({
  authors: state.authors
})

const mapDispatchToProps = dispatch => ({
  getAuthors: () => dispatch(getAuthors())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authors)
