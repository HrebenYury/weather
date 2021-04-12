import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal'

const ModalCard = ({ day, closeModal, modalIsOpen }) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            closeTimeoutMS={100}
            className="Modal"
            overlayClassName="Overlay"
        >

            <div className="modal-small-label">
                <h2>{day.date}</h2>
            </div>
            <div className="modal-middle-label">
                <div className="morning-temp">
                    <h2>Morning</h2>
                    <h3>{day.morn_temp} °C</h3>
                    <h4>Feels {day.morn_feels_like} °C</h4>
                </div>
                <div className="day-temp">
                    <h2>Day</h2>
                    <h3>{day.day_temp} °C</h3>
                    <h4>Feels {day.day_feels_like} °C</h4>
                </div>
                <div className="evening-temp">
                    <h2>Evening</h2>
                    <h3>{day.eve_temp} °C</h3>
                    <h4>Feels {day.eve_feels_like} °C</h4>
                </div>
                <div className="night-temp">
                    <h2>Night</h2>
                    <h3>{day.night_temp} °C</h3>
                    <h4>Feels {day.night_feels_like} °C</h4>
                </div>
                <div>
                    <h2>{day.sunrise}</h2>
                    <span>Sunrise</span>
                </div>
                <div>
                    <h2>{day.sunset}</h2>
                    <span>Sunset</span>
                </div>
                <div>
                    <h2>{day.pressure} hPa</h2>
                    <span>Pressure</span>
                </div>
                <div>
                    <h2>{day.wind_speed} m/h</h2>
                    <span>Wind speed</span>
                </div>

            </div>
            <div className="modal-big-label">
                <div className="modal-icon">
                    <FontAwesomeIcon icon={day.icon} />
                    <h3>{day.description}</h3>
                </div>
                <div className="modal-humidity">
                    <h2>{day.humidity} %</h2>
                    <span>Humidity</span>
                </div>
            </div>
            <button onClick={closeModal} className="close-modal-button">CLOSE</button>
        </Modal>

    )
}


export { ModalCard }


