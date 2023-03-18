from collections import UserDict
from flask import Flask, abort, request, jsonify
from pymongo import MongoClient
import bcrypt

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client['pibit-mall']
users_collection = db['users']

@app.route('/signup', methods=['POST'])
def signup(name, email, password, address, city, state, pi_wallet):
    hashed_password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
    users_collection.insert_one({
        'name': name,
        'email': email,
        'password': hashed_password,
        'address': address,
        'city': city,
        'state': state,
        'pi_wallet': pi_wallet
    })

@app.route('/login', methods=['POST'])
def login(email, password):
    user = users_collection.find_one({'email': email})
    if user and bcrypt.checkpw(password.encode('utf8'), user['password']):
        return True
    else:
        return jsonify({'message': 'Invalid email or password'})







@app.route('/api/user/<user_id>', methods=['PUT'])
def update_user(user_id):
    user = UserDict.query.filter_by(id=user_id).first()
    if not user:
        abort(404)
    data = request.get_json()
    user.name = data['name']
    user.email = data['email']
    user.pi_wallet = data['pi_wallet']
    db.session.commit()
    return jsonify({'message': 'User updated successfully.'})





if __name__ == '__main__':
    app.run(debug=True)
