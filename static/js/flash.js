window.Flash = (() => {

	let module = {}

	module.flash = 0

	module.success = (msg, delay) => {
		module.flash = (module.flash + 1)
		module.toast(msg, 'success', delay)
	}

	module.error = (msg, delay) => {
		module.flash = (module.flash + 1)
		module.toast(msg, 'error', delay)
	}

	module.info = (msg, delay) => {
		module.flash = (module.flash + 1)
		module.toast(msg, 'info', delay)
	}

	module.toast = (msg, type, delay) => {
		if (module.flash >= 1) {
			$('#flash').toggle()
		}

		let uuid = module.uuid()
		let flash = $(`<div id="flash-${uuid}" class="flash flash-${type}">${msg}</div>`)
			.append('<span class="close-flash"><i class="fa fa-close"></i></span>')
			.on('click', (e) => {
				$(`#flash-${uuid}`).remove()
				module.flash = (module.flash - 1)
				if (module.flash <= 0) {
					module.flash = 0
					$('#flash').hide()
				}
			})
			.fadeIn('slow')
			.delay(delay)
			.fadeOut('slow', () => {
				module.flash = (module.flash - 1)
				$(`#flash-${uuid}`).remove()
				if (module.flash <= 0) {
					module.flash = 0
					$('#flash').hide()
				}
			})

		$('#flash').append(flash)
	}

	module.uuid = () => {
		var dt = new Date().getTime()
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
	        var r = ((dt + Math.random() * 16) % 16 | 0)
	        dt = Math.floor(dt  /16)
	        return (c == 'x' ? r :(r & 0x3 | 0x8)).toString(16)
	    })
	    return uuid
	}

	return module

})()