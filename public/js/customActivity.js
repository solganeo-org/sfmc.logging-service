/* eslint-disable no-undef */
define(['postmonger', 'lightning-lookup'], function (
  Postmonger,
  LightningLookup
) {
  'use strict'

  var connection = new Postmonger.Session()
  var payload = {}
  var eventDefinitionKey = ''
  var eventDefinitionID = ''

  var journeydata = {}
  var journeyName = ''
  var inArgument = {}

  var lastStepEnabled = false
  var contactAttributesResult = []

  $(window).ready(onRender)

  connection.on('initActivity', initialize)
  connection.on('requestedTokens', onGetTokens)
  connection.on('requestedEndpoints', onGetEndpoints)
  connection.on('requestedDataSources', requestDataSources)
  connection.on(
    'requestedTriggerEventDefinition',
    function (eventDefinitionModel) {
      // console.log('*** TriggerEventDefinition ***');
      // console.log(eventDefinitionModel);
      eventDefinitionKey = eventDefinitionModel.eventDefinitionKey
      eventDefinitionID = eventDefinitionModel.id
    }
  )

  connection.on('clickedNext', onClickedNext)

  function onRender() {
    Spinner(true)
    // JB will respond the first time 'ready' is called with 'initActivity'

    connection.trigger('requestTokens')
    connection.trigger('requestEndpoints')
    connection.trigger('requestDataSources')
    connection.trigger('requestTriggerEventDefinition')

    connection.trigger('ready')

    // Disable the next button if a value isn't selected
    $('#select1').change(function () {
      var message = getMessage()
      connection.trigger('updateButton', {
        button: 'next',
        enabled: Boolean(message),
      })

      $('#message').html(message)
    })
  }

  function initialize(data) {
    if (data) {
      payload = data
    }

    var hasInArguments = Boolean(
      payload['arguments'] &&
        payload['arguments'].execute &&
        payload['arguments'].execute.inArguments &&
        payload['arguments'].execute.inArguments.length > 0
    )

    var inArguments = hasInArguments
      ? payload['arguments'].execute.inArguments
      : {}

    Spinner(false)

    LoadAttributeSets(inArguments, true)

    connection.trigger('updateButton', {
      button: 'next',
      text: 'done',
      visible: true,
    })
  }

  function requestDataSources(dataSources) {
    // console.log('*** DataSources ***')
    // console.log(dataSources)
    journeydata = dataSources
    journeyName = journeydata[0].name

    console.log(journeyName)
  }

  function Spinner(show) {
    if (show) {
      $('.spinner').show()
    } else {
      $('.spinner').hide()
    }
  }

  function LoadAttributeSets(inArguments, isInit) {
    contactAttributesResult.length = 0
    var url = '/sfmcHelper/fieldNames'

    if (eventDefinitionKey != '') {
      url += '?eventDefinitionKey=' + eventDefinitionKey
    }
    if (!isInit) {
      Spinner(true)
    }

    if (!isInit) {
      Spinner(false)
    } else {
      inArgument = inArguments[0]

      console.log(inArgument)

      if (inArguments.length > 0) {
        // Log Input
        inArguments[0].UILogName
          ? ($('#text-input-log-name')[0].value = inArgument.UILogName)
          : false

        inArguments[0].UILogName
          ? ($('#text-input-log-description')[0].value =
              inArgument.UILogDescription)
          : false
      }
    }
  }

  function onGetTokens(tokens) {
    // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
    // console.log(tokens);
  }

  function onGetEndpoints(endpoints) {
    // Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
    // console.log(endpoints);
  }
  function onClickedNext() {
    Spinner(true)

    let alertRequiredFields = $('#alert-required-fields')
    alertRequiredFields.hide()

    if (validateSave()) {
      Spinner(false)

      let alertRequiredFields = $('#alert-required-fields')
      alertRequiredFields.show()

      connection.trigger('ready')
      return
    } else {
      save()
      return
    }
  }

  function validateSave() {
    let isError = false

    $('.required').each(function (i, el) {
      var data = $(el).val()

      if (
        this.id == 'subscriberLookup' ||
        this.id == 'endpointLookup' ||
        this.id == 'p256dhLookup' ||
        this.id == 'authLookup'
      ) {
        if ($('#' + this.id).lookup('getSelection') == null) {
          $(this)
            .closest('.slds-form-element_stacked')
            .addClass('slds-has-error')
          isError = true
          event.preventDefault()
        } else {
          $(this)
            .closest('.slds-form-element_stacked')
            .removeClass('slds-has-error')
        }
      } else {
        var len = data.length
        if (len < 1) {
          $(this)
            .closest('.slds-form-element_stacked')
            .addClass('slds-has-error')
          isError = true
          event.preventDefault()
        } else {
          $(this)
            .closest('.slds-form-element_stacked')
            .removeClass('slds-has-error')
        }
      }
    })

    // let isErrorUrl =
    //   $('.validateUrl').val() != ''
    //     ? !isValidURL($('.validateUrl').val())
    //     : false

    // if (isErrorUrl) {
    //   $('.slds-notify_alert').fadeIn()
    //   $('.validateUrl')
    //     .closest('.slds-form-element_stacked')
    //     .addClass('slds-has-error')
    // } else {
    //   $('.slds-notify_alert').fadeOut()
    //   $('.validateUrl')
    //     .closest('.slds-form-element_stacked')
    //     .removeClass('slds-has-error')
    // }

    // return isError || isErrorUrl

    return isError
  }

  function buildArgument(value) {
    let valueSplited = value.split('.')
    let valueField = '"'
    for (var i = 2; i < valueSplited.length; i++) {
      valueField += valueSplited[i]
    }

    valueField += '"'
    let returningValue =
      valueSplited[0] + '.' + valueSplited[1] + '.' + valueField
    return returningValue
  }

  function NormalizeInArgument(inArg) {
    if (inArg.startsWith('EntrySource.')) {
      return '{{' + inArg.replace('EntrySource.', 'Event.') + '}}'
    }
    var firstPart = inArg.substring(0, inArg.indexOf('.'))
    var lastPart = inArg.substring(inArg.indexOf('.') + 1)
    return '{{Contact.Attribute."' + firstPart + '"."' + lastPart + '"}}'
  }

  function save() {
    var inArgs = []
    var arg = {}
    arg.contactId = '{{Contact.Id}}'
    arg.publicationID = '{{Context.PublicationId}}'
    arg.journeyVersion = '{{Context.VersionNumber}}'
    arg.journeyName = journeyName

    Spinner(false)

    arg.UIDEName = 'Journey Logger Activities'
    arg.UILogName = $('#text-input-log-name')[0].value
    arg.UILogDescription = $('#text-input-log-description')[0].value

    inArgs.push(arg)

    payload['arguments'].execute.inArguments = inArgs

    payload['metaData'].isConfigured = true
    connection.trigger('updateActivity', payload)
  }

  function getMessage() {
    return $('#select1').find('option:selected').attr('value').trim()
  }
})
