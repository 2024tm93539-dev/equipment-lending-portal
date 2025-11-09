from app import create_app, db
from app.models.models import User, Equipment
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()

    # Admin
    admin = User(
        name="Admin User",
        email="admin@example.com",
        password_hash=generate_password_hash("adminpass"),
        role="admin"
    )

    # Students
    s1 = User(name="Alice", email="alice@example.com", password_hash=generate_password_hash("alice123"), role="student")
    s2 = User(name="Bob", email="bob@example.com", password_hash=generate_password_hash("bob123"), role="student")

    # Equipment
    e1 = Equipment(name="Camera", category="Electronics", quantity=3, available_quantity=3, description="DSLR Camera")
    e2 = Equipment(name="Tripod", category="Accessories", quantity=5, available_quantity=5, description="Sturdy Tripod")
    e3 = Equipment(name="Laptop", category="Computers", quantity=2, available_quantity=2, description="MacBook Air")

    staff = User(
    name="Lab Staff",
    email="staff@example.com",
    password_hash=generate_password_hash("staff123"),
    role="staff"
    )

    db.session.add_all([admin, s1, s2, e1, e2, e3, staff])
    db.session.commit()

    print("✅ Seed data inserted successfully!")

