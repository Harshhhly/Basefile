from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# Car data with categories
CARS = {
    'sports': [
        {'name': 'Ferrari F8', 'price': '$280,000', 'power': '710 HP', 'top_speed': '211 mph', 'model': 'ferrari.glb'},
        {'name': 'Lamborghini Huracán', 'price': '$261,000', 'power': '631 HP', 'top_speed': '202 mph', 'model': 'lambo.glb'},
        {'name': 'Porsche 911 GT3', 'price': '$162,000', 'power': '502 HP', 'top_speed': '198 mph', 'model': 'porsche.glb'}
    ],
    'luxury': [
        {'name': 'Rolls-Royce Phantom', 'price': '$460,000', 'power': '563 HP', 'top_speed': '155 mph', 'model': 'rolls.glb'},
        {'name': 'Bentley Continental GT', 'price': '$220,000', 'power': '626 HP', 'top_speed': '207 mph', 'model': 'bentley.glb'},
        {'name': 'Mercedes-Maybach S-Class', 'price': '$185,000', 'power': '496 HP', 'top_speed': '130 mph', 'model': 'maybach.glb'}
    ],
    'electric': [
        {'name': 'Tesla Model S Plaid', 'price': '$135,000', 'power': '1,020 HP', 'top_speed': '200 mph', 'model': 'tesla.glb'},
        {'name': 'Porsche Taycan Turbo S', 'price': '$187,000', 'power': '750 HP', 'top_speed': '162 mph', 'model': 'taycan.glb'},
        {'name': 'Lucid Air Sapphire', 'price': '$249,000', 'power': '1,234 HP', 'top_speed': '205 mph', 'model': 'lucid.glb'}
    ],
    'suv': [
        {'name': 'Lamborghini Urus', 'price': '$230,000', 'power': '641 HP', 'top_speed': '190 mph', 'model': 'urus.glb'},
        {'name': 'Bentley Bentayga', 'price': '$177,000', 'power': '542 HP', 'top_speed': '180 mph', 'model': 'bentayga.glb'},
        {'name': 'Range Rover SV', 'price': '$215,000', 'power': '557 HP', 'top_speed': '155 mph', 'model': 'ranger.glb'}
    ]
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/cars/<category>')
def get_cars(category):
    """API endpoint to fetch cars by category"""
    if category in CARS:
        return jsonify({'status': 'success', 'cars': CARS[category]})
    return jsonify({'status': 'error', 'message': 'Category not found'}), 404

@app.route('/api/cars')
def get_all_cars():
    """API endpoint to fetch all cars"""
    return jsonify({'status': 'success', 'cars': CARS})

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submission"""
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    # Here you would typically save to database or send email
    print(f"Contact form: {name} ({email}): {message}")
    
    return jsonify({'status': 'success', 'message': 'Thank you for contacting us!'})

if __name__ == '__main__':
    app.run(debug=True)
