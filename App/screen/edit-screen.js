import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  DatePickerIOS,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
import Header from '../components/header'
import { NavigationActions } from 'react-navigation'
import ExpenseForm from '../components/expense-form'
import addexpenses from '../redux-store/add-expenses' 
import AddExpenseButton from '../components/login-button'
import moment from 'moment'
import Selectable from '../components/select-component'
import config from '../config'
import { connect } from 'react-redux'

// date: new Date('2018-04-29T11:16:36.858Z'), car_type: 'comp_car_gas', km: 9, route_descr: 'Linköping på kundträff', attest: false, client: 'Kund D'}

class EditScreen extends Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this) 
  }

  componentWillUnmount() {
    // clear expensesAdded screen
  }

  componentDidMount () {
    console.log('hit kommer jag ')
    const { chosenCarType, attachName, attachUserId, expenseProps, id } = this.props
    // expenseProp.car_type = chosenCarType
    // expenseProp.userId = id
    this.userid = config.testUserId ? config.testUserId : id
    attachName(expenseProps.name)
    attachUserId(expenseProps.id)
  }

  onChange (type) {
    let functions = {
      km: this.onKmChange,
      client: this.onClientChange, 
      route_descr: this.onRouteChange,
      date: this.onDateChange,
      car_type: this.onCarChange
    }
    return functions[type]
  }

  onPress = (type) => {
    const { onDatePress } = this.props
    let functions = {
      date: onDatePress
    }
    return functions[type]
  }

  onPressSend = () => {
    const { addExpenses, clearExpenses, expenseProps } = this.props
    console.log('payload:', expenseProps)
    console.log('addExpenses:', addExpenses)
    addExpenses(this.userid, expenseProps)
    setTimeout(() => {}, 100)
    clearExpenses()
    setTimeout(() => {this.goBack(this.props)}, 100)
  }

  goBack = (props) => {
    props.navigation.dispatch(NavigationActions.back())
  }

  onKmChange = (data) => {
    const { kmChange } = this.props
    kmChange(data)
  }

  onClientChange = (data) => {
    const { clientChange } = this.props
    clientChange(data) 
  }

  onRouteChange = (data) => {
    const { routeChange } = this.props
    routeChange(data)
  }

  onDateChange = (data) => {
    const { dateChange } = this.props
    dateChange(data)
  }

  onCarChange = (arr, index) => {
    let data = arr[index]
    const { carChange, onCarPress } = this.props
    carChange(data)
    onCarPress()
  }

  renderSelectables = (arr, carTypeChosen) => {
    console.log('1:', arr)
    if (!arr) return null
    console.log(2)
    return arr.map((carTypeName) => {
      let attest = false
      console.log(3)
      if (carTypeName.match(carTypeChosen)) {
        attest = true
      }
      return (
        <Selectable onPress={() => { this.onCarChange(arr, arr.indexOf(carTypeName)) }} descr={carTypeName} attest={attest} key={carTypeName} /> // Look out for issues with unique key
      )
    })
  }


  render () {
    const { hideDate, carTypes, carType, dateModalOpened, carSelectOpened, onCarPress, expenseProps} = this.props
    return (
      <TouchableWithoutFeedback 
      onPress={() => {  
        console.log('hejsan keybord dismiss #########################################') 
        Keyboard.dismiss()} }
      onPressOut={() => { console.log('hejsan keybord dismiss 22222 #########################################')  } } >
      <View style={styles.container}>
        <Header buttonName='Avbryt' onPress={() => { this.goBack(this.props) }} />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>
           Editera mina utgifter
          </Text>
        </View>
        <ScrollView>
          <ExpenseForm carTypes={carTypes} renderSelectables={this.renderSelectables} onCarPress={onCarPress} _toggleModal={hideDate} onChange={this.onChange}  expenseProps={expenseProps} onPress={this.onPress} modelOpen={dateModalOpened} carSelectOpen={carSelectOpened} />
        </ScrollView>
        <AddExpenseButton onPress={ this.onPressSend } buttonName='Skicka in' />
      </View>
      </ TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    carTypes: state.userExpenses.carType,
    dateModalOpened: state.userExpenses.dateModalOpened,
    carSelectOpened: state.userExpenses.carSelectOpened,
    expenseProps: {
      date: state.addExpenses.addedExpense.date,
      attest: state.addExpenses.addedExpense.attest,
      carType: state.addExpenses.addedExpense.carType,
      km: state.addExpenses.addedExpense.km,
      route_descr: state.addExpenses.addedExpense.route_descr,
      client: state.addExpenses.addedExpense.client,
      userId: state.userExpenses._id,
      name: state.userExpenses.name
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDatePress: () => { dispatch({ type: 'OPEN_DATE_MODAL' }) },
    hideDate: () => { dispatch({ type: 'CLOSE_DATE_MODAL' }) },
    addExpenses: (userId, expenseProp) => { dispatch(addexpenses(expenseProp)) },
    clearExpenses: () => { dispatch({ type: 'CLEAR_ALL_EXPENSES' }) },
    kmChange: (data) => { dispatch({
      type: 'ADD_NEW_EXPENSE_KM',
      data })  
    },
    clientChange: (data) => { dispatch({
      type: 'ADD_NEW_EXPENSE_CLIENT',
      data })
    },
    routeChange: (data) => { dispatch({
      type: 'ADD_NEW_EXPENSE_ROUTEDESCR',
      data
      })
    },
    dateChange: (data, userId) => { dispatch({
      type: 'ADD_NEW_EXPENSE_DATE',
      data
      }) // userId had to be added somewhere. This location was arbitarily chosen.
    },
    carChange: (data) => {
      dispatch({
        type: 'ADD_NEW_EXPENSE_CARTYPE',
        data
      })
    },
    onCarPress: () => {
      dispatch({
        type: 'OPEN_CAR_SELECT',
      })
    },
    attachName: (data) => {
      type: 'ATTACH_NAME_TO_EXPENSE',
      data
    },
    attachUserId: (data) => {
      type: 'ATTACH_USERID_TO_EXPENSE',
      data
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen)

const buttonThemeColor = '#C21807'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textContainer: {
    height: 80,
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: buttonThemeColor,
    alignItems: 'center',
    width: '100%'
  },
  headerPicture: {
    height: 100,
    width: 100
  }
})
