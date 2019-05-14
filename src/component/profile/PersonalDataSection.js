import React from "react";

const PersonalDataSection = () => {

    const props ={
        nick :"User 1",
        email:"test@test.pl",
        city:"Rzeszów",
        desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam assumenda cum dicta dolore\n" +
            "                    eveniet,\n" +
            "                    excepturi, expedita impedit in incidunt ipsam mollitia, porro qui repellat reprehenderit sequi\n" +
            "                    tempore vel\n" +
            "                    vitae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid amet, assumenda\n" +
            "                    consequatur corporis cum cupiditate distinctio doloribus, eligendi, error libero nesciunt quasi quis\n" +
            "                    repellat sapiente similique tempora totam vel?"
    };

    return(
        <div id="profile">
           <h1>Witaj, {props.nick}!</h1>
            <div className="short-info">
            <div className="avatar">
                <i className="far fa-user-circle"> </i>
            </div>
            <div className="personal-data">
                <div className="nick">
                    <p>Nick:</p>
                    <p>{props.nick}</p>
                </div>
                <div className="email">
                    <p>E-mail:</p>
                    <p>{props.email}</p>

                </div>
                <div className="city">
                    <p>Miasto:</p>
                    <p>{props.city}</p>

                </div>
            </div>
            </div>

            <div className="personal-description">
                <p>Krótki opis:</p>
                <p>{props.desc}</p>
            </div>
            <div className="edit-place">
                <div className="colors">
                    <p>Kolory: </p>
                    <div className="first">
                        <div className="background">&nbsp;</div>
                        <div className="second-background"></div>
                        <div className="third-background"></div>
                        <div className="color-text">&nbsp;</div>
                        <div className="color-link"></div>
                    </div>
                    <div className="second">
                        <div className="background"></div>
                        <div className="second-background"></div>
                        <div className="third-background"></div>
                        <div className="color-text"></div>
                        <div className="color-link"></div>
                    </div>
                    <div className="third">
                        <div className="background"></div>
                        <div className="second-background"></div>
                        <div className="third-background"></div>
                        <div className="color-text"></div>
                        <div className="color-link"></div>
                    </div>
                </div>
                <div className="button">
                    <input type="button" value="Edytuj dane" name="edit" id="edit-btn"/>
                </div>

            </div>
        </div>
    );
};

export default PersonalDataSection;