// npm modules
import Papa from 'papaparse'

// css
import { ChangeEvent, useState } from 'react';
import styles from './UploadTransModal.module.css'

// types
import { TransactionsFormData, UploadTransaction } from '../../types/forms'
interface UploadTransModalProps {
  show: boolean;
  setShowModal: (showModal: boolean) => void;
  selectedAccount: number;
  handleUploadTransactions: (transactionFormData: TransactionsFormData, accountId: number) => Promise<void>
}

interface HeaderMap {
  transactionDate: string;
  description: string;
  amount: string;
  category: string;
  subCategory: string;
}

const UploadTransModal = (props: UploadTransModalProps): JSX.Element => {
  const { show, setShowModal, selectedAccount, handleUploadTransactions } = props
  const [file, setFile] = useState<string>('')
  const [headerMap, setHeaderMap] = useState<HeaderMap>({
    transactionDate: '',
    description: '',
    amount: '',
    category: '',
    subCategory: ''
  })
  const [uploadedColumns, setUploadedColumns] = useState<string[]>([])
  const [temporaryData, setTemporaryData] = useState<Record<string, string>[]>([])
  const [message, setMessage] = useState<string>('Select the corresponding columns in your data')
  
  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.currentTarget.files) return
    setFile(evt.currentTarget.value)
    Papa.parse(evt.currentTarget.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = Object.keys(results.data[0] as object)
        setUploadedColumns(headers)
        setTemporaryData(results.data as Record<string, string>[])
      }
    })
  }

  const handleHeaderMapChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    setHeaderMap({
      ...headerMap, 
      [evt.currentTarget.name]: evt.currentTarget.value
    })
  }

  const handleUpload = async (): Promise<void> => {
    const transactions = temporaryData.map( t => {
      const res: UploadTransaction = {
        transactionDate: t[headerMap.transactionDate],
        amount: t[headerMap.amount],
        description: t[headerMap.description]
      }
      if (headerMap.category) res.category = t[headerMap.category]
      if (headerMap.subCategory) res.subCategory = t[headerMap.subCategory]
      return res
    })
    // Check for valid header selections
    if (!checkValidHeaderMap()) return

    const batches: TransactionsFormData[] = []
    try {
      for (let i = 0; i < transactions.length; i+=500){
        batches.push({
          transactions: transactions.slice(i, i + 500)
        })
      }
      Promise.all(
        batches.map( async (batch) => {
          await handleUploadTransactions(batch, selectedAccount)
        })
      )
      setFile('')
      setHeaderMap({
        transactionDate: '',
        description: '',
        amount: '',
        category: '',
        subCategory: '',
      })
      setTemporaryData([])
      setUploadedColumns([])
      setShowModal(false)
      setMessage('Select the corresponding columns in your data')
    } catch (err) {
      console.log(err)
    }
  }

  const checkValidHeaderMap = ():boolean => {
    // Required columns not filled in
    if (!headerMap.amount || !headerMap.transactionDate || !headerMap.description) {
      setMessage('Please fill in all the required columns')
      return false
    // All columns mapped but not uniquely
    } else if (
      headerMap.category && headerMap.subCategory &&
      new Set(Object.values(headerMap)).size !== Object.values(headerMap).length
    ){
      setMessage('Please ensure that you have selected unique columns')
      return false
    } else if (
      (headerMap.category && !headerMap.subCategory) ||
      (!headerMap.category && headerMap.subCategory)
    ){
      setMessage('Please map none or all of category and sub category')
      return false
    }
    return true
  }

  const handleCloseModal = (): void => {
    setShowModal(false)
    setHeaderMap({
      transactionDate: '',
      description: '',
      amount: '',
      category: '',
      subCategory: '',
    })
    setFile('')
  }

  return (
    <div 
      className={styles.container}
      style={{display: show ? 'flex' : 'none'}}
    >
      <div 
        className={styles.modal}
      >
        <header>
          <span
            onClick={handleCloseModal}
          >
            X
          </span>
        </header>
        <section>
          <div className={styles.inputContainer}>
            <input
              title=''
              type="file"
              name="file"
              accept=".csv"
              style={{ display: "block", margin: "10px auto" }}
              value={file}
              onChange={handleFileChange}
            />
          </div>
          {
            file &&
            <div className={styles.columnMapContainer}>
              <p>{message}</p>
              <div>
                <h4>Required Column</h4>
                <h4>Column from Upload</h4>
              </div>
              <div>
                <label htmlFor="transactionDate">Transaction Date</label>
                <select 
                  name="transactionDate" 
                  id="transactionDate"
                  onChange={handleHeaderMapChange}
                  value={headerMap.transactionDate}
                  required
                >
                  <option value="">--</option>
                  {uploadedColumns.map(c => (
                    <option value={c} key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <select 
                  name="description" 
                  id="description"
                  onChange={handleHeaderMapChange}
                  value={headerMap.description}
                  required
                >
                  <option value="">--</option>
                  {uploadedColumns.map(c => (
                    <option value={c} key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="amount">Amount</label>
                <select 
                  name="amount"
                  id='amount'
                  onChange={handleHeaderMapChange}
                  value={headerMap.amount}
                  required
                >
                  <option value="">--</option>
                  {uploadedColumns.map(c => (
                    <option value={c} key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <h4>Optional Column</h4>
                <h4>Column from Upload</h4>
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <select 
                  name="category"
                  id='category'
                  onChange={handleHeaderMapChange}
                  value={headerMap.category}
                  required
                >
                  <option value="">--</option>
                  {uploadedColumns.map(c => (
                    <option value={c} key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="subCategory">Sub-Category</label>
                <select 
                  name="subCategory"
                  id='subCategory'
                  onChange={handleHeaderMapChange}
                  value={headerMap.subCategory}
                  required
                >
                  <option value="">--</option>
                  {uploadedColumns.map(c => (
                    <option value={c} key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>
              
          }
        </section>
      </div>
    </div>
  )
}
 
export default UploadTransModal