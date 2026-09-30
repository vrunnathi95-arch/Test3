"""
Quick test script to verify authentication is working
Run this while the backend server is running
"""

import requests
import json

BASE_URL = "http://localhost:8000/api"

print("=" * 60)
print("Testing Student Task Manager Authentication")
print("=" * 60)

# Test 1: Register a new user
print("\n1. Testing Registration...")
try:
    response = requests.post(
        f"{BASE_URL}/auth/register",
        json={
            "full_name": "Test User",
            "email": "test@example.com",
            "password": "password123"
        }
    )
    if response.status_code == 200:
        data = response.json()
        print("✅ Registration successful!")
        print(f"   User: {data['user']['full_name']}")
        print(f"   Email: {data['user']['email']}")
        print(f"   Token: {data['token'][:50]}...")
        token = data['token']
    elif response.status_code == 400:
        print("⚠️  User already exists, trying login instead...")
        token = None
    else:
        print(f"❌ Registration failed: {response.status_code}")
        print(f"   Error: {response.text}")
        token = None
except Exception as e:
    print(f"❌ Registration error: {e}")
    token = None

# Test 2: Login with existing user
print("\n2. Testing Login...")
try:
    response = requests.post(
        f"{BASE_URL}/auth/login",
        json={
            "email": "test@example.com",
            "password": "password123"
        }
    )
    if response.status_code == 200:
        data = response.json()
        print("✅ Login successful!")
        print(f"   User: {data['user']['full_name']}")
        print(f"   Email: {data['user']['email']}")
        print(f"   Token: {data['token'][:50]}...")
        token = data['token']
    else:
        print(f"❌ Login failed: {response.status_code}")
        print(f"   Error: {response.text}")
except Exception as e:
    print(f"❌ Login error: {e}")

# Test 3: Get current user info
if token:
    print("\n3. Testing Get Current User...")
    try:
        response = requests.get(
            f"{BASE_URL}/auth/me",
            params={"token": token}
        )
        if response.status_code == 200:
            data = response.json()
            print("✅ Get current user successful!")
            print(f"   User: {data['full_name']}")
            print(f"   Email: {data['email']}")
        else:
            print(f"❌ Get current user failed: {response.status_code}")
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Get current user error: {e}")

# Test 4: Create a task
if token:
    print("\n4. Testing Create Task...")
    try:
        response = requests.post(
            f"{BASE_URL}/tasks",
            params={"token": token},
            json={
                "title": "Test Task",
                "description": "This is a test task",
                "category": "Personal",
                "priority": "High",
                "due_date": "2026-12-31T10:00:00"
            }
        )
        if response.status_code == 200:
            data = response.json()
            print("✅ Task creation successful!")
            print(f"   Task ID: {data['id']}")
            print(f"   Title: {data['title']}")
            print(f"   Status: {data['status']}")
        else:
            print(f"❌ Task creation failed: {response.status_code}")
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Task creation error: {e}")

# Test 5: Get dashboard stats
if token:
    print("\n5. Testing Dashboard Stats...")
    try:
        response = requests.get(
            f"{BASE_URL}/dashboard/stats",
            params={"token": token}
        )
        if response.status_code == 200:
            data = response.json()
            print("✅ Dashboard stats successful!")
            print(f"   Total Tasks: {data['total']}")
            print(f"   Pending: {data['pending']}")
            print(f"   Completed: {data['completed']}")
            print(f"   Overdue: {data['overdue']}")
        else:
            print(f"❌ Dashboard stats failed: {response.status_code}")
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Dashboard stats error: {e}")

print("\n" + "=" * 60)
print("Test Complete!")
print("=" * 60)
