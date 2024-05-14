import React, { Component } from "react";
import Title from "./Title";
import { FaCocktail, FaBeer, FaWifi, FaIcons } from "react-icons/fa" 

class Services extends Component {
    state={
        services:[
            {
                id: 1,
                icon:<FaCocktail />,
                title:"Free coctails",
                info:"Best coctails in the world!"
            },
            {
                id: 2,
                icon:<FaBeer />,
                title:"Free beer",
                info:"Best beer in the world!"
            },
            {
                id: 3,
                icon:<FaWifi />,
                title:"Wi-Fi",
                info:"Free Wi-Fi!"
            },
            {
                id: 4,
                icon:<FaIcons />,
                title:"Party night",
                info:"Party night every night!"
            }
        ]
    }
    render() {
        return(
            <section className="services">
                <Title title="Services"></Title>
                <div className="services-center">
                    {this.state.services.map(item => (
                        <article key={item.id} className="service">
                            <span>
                                {item.icon}
                            </span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    )
                    )}
                </div>
            </section>
        )
    }
}

export default Services