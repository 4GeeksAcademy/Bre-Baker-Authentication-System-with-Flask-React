import os
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_jwt_extended import JWTManager
from flask import session

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    # Retrieve request data
    email = request.json.get('email')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    password = request.json.get('password')
    
    # Check if the email is already registered
    if User.query.filter_by(email=email).first():
        return jsonify(message='Email already registered'), 200

    # Create a new user object
    new_user = User(email=email, first_name=first_name, last_name=last_name, password=password, is_active=True)
    
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify(message='Failed to register user'), 200

    return jsonify(message='User registered successfully'), 200


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Perform authentication
    user = User.query.filter_by(email=email).first()
    if user is None or password != password:
        return jsonify({"msg": "Incorrect email or password"}), 401

    # Generate access token
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route('/logout', methods=['POST'])
def logout():
    # Perform logout 
    session.clear()
    return jsonify(message='User logged out successfully'), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({"id": user.id, "email": user.email}), 200


if __name__ == "__main__":
    api.run()