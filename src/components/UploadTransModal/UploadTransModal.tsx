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
}

const UploadTransModal = (props: UploadTransModalProps): JSX.Element => {
  const { show, setShowModal, selectedAccount, handleUploadTransactions } = props
  const [file, setFile] = useState<string>('')
  const [headerMap, setHeaderMap] = useState<HeaderMap>({
    transactionDate: '',
    description: '',
    amount: '',
  })
  const [uploadedColumns, setUploadedColumns] = useState<string[]>([])
  const [temporaryData, setTemporaryData] = useState<Record<string, string>[]>([])
  
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
      return {
        transactionDate: t[headerMap.transactionDate],
        amount: t[headerMap.amount],
        description: t[headerMap.description]
      } as UploadTransaction
    })
    const transactionFormData: TransactionsFormData = {
      transactions
    }
    await handleUploadTransactions(transactionFormData, selectedAccount)
    setFile('')
    setHeaderMap({
      transactionDate: '',
      description: '',
      amount: '',
    })
    setTemporaryData([])
    setUploadedColumns([])
    setShowModal(false)
  }

  const handleCloseModal = (): void => {
    setShowModal(false)
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
              <div>
                <h4>Required Column</h4>
                <h4>Column from Data</h4>
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
            <button
              onClick={handleUpload}
            >
              Upload
            </button>
            </div>
              
          }
        </section>
      </div>
    </div>
  )
}
 
export default UploadTransModal