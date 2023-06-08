import { SubCategory } from "../types/forms"

export const categories = [ 
  {value: '-', schemaName: 'uncoded'}, 
  {value: 'Fun', schemaName: 'fun'}, 
  {value: 'Food/Necessities', schemaName: 'foodNecessities'},	
  {value: 'Housing', schemaName: 'housing'},
  {value: 'Income', schemaName: 'income'},
  {value: 'Insurance', schemaName: 'insurance'},
  {value: 'Medical/Health', schemaName: 'medicalHealth'},
  {value: 'Misc', schemaName: 'misc'},
  {value: 'Personal', schemaName: 'personal'}, 
  {value: 'Savings', schemaName: 'savings'},
  {value: 'Transportation', schemaName: 'transportation'},
  {value: 'Utilities', schemaName: 'utilities'},
  {value: 'Exclude', schemaName: 'exclude'}
]

export const subCategories: SubCategory = {
  fun: [
    'Events',
    'Vacations/Travel',
    'Eating out',
    'Alcohol',
    'Activities'
  ],
  foodNecessities: [ 'Groceries', 'Pet food', 'CVS' ],
  housing: [
    'Mortgage or Rent',
    'Property taxes',
    'Household repairs',
    'HOA fees',
    'Cleaning'
  ],
  transportation: [
    'Car maintenance',
    'Gas',
    'Public Transit',
    'Registration',
    'Car payments'
  ],
  utilities: [ 'Gas/Electric', 'Water', 'Phones', 'Cable/Internet' ],
  medicalHealth: [
    'Primary care',
    'Dental care',
    'Specialty care',
    'Urgent care',
    'Medications',
    'Prescriptions',
    'Devices/Supplies'
  ],
  savings: [
    'Down Payment',
    'Closing Costs',
    'Furniture',
    'Moving expenses',
    'Honeymoon',
    'Wedding',
    'Investments',
    'Taxes',
    'Cash',
    'Grad School'
  ],
  insurance: [
    'Health insurance',
    'Home insurance',
    'Car insurance',
    'Life insurance',
    'Disability insurance'
  ],
  personal: [
    'Memberships/subscriptions',
    'Clothes',
    'Shoes',
    'Gifts',
    'Donations',
    'Workout stuff',
    'Self care',
    'Online shopping',
    'Other shopping',
    'Home goods'
  ],
  misc: [ 'Small things', 'Work purchases', 'Other', 'Tax Completion' ],
  income: [
    'SB paycheck',
    'CN paycheck',
    'Family gift',
    'Reimbursement',
    'Relief Payment',
    'Taxes',
    'Dividend',
    'Wedding Gift',
    'Paycheck'
  ],
  uncoded: ['-'],
  exclude: [
    'Payment',
    'Transfer',
    'Other'
  ]
}