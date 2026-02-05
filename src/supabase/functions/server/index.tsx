import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1d5449a0/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== AUTHENTICATION ROUTES ====================

// Sign up route
app.post("/make-server-1d5449a0/auth/signup", async (c) => {
  try {
    const { email, password, name, role } = await c.req.json();
    
    if (!email || !password || !name || !role) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Error creating user during signup: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Store user profile in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      role,
      createdAt: new Date().toISOString()
    });

    return c.json({ 
      user: {
        id: data.user.id,
        email,
        name,
        role
      },
      message: "User created successfully" 
    });
  } catch (error) {
    console.log(`Unexpected error during signup: ${error}`);
    return c.json({ error: "Internal server error during signup" }, 500);
  }
});

// Get user profile
app.get("/make-server-1d5449a0/auth/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "No access token provided" }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      console.log(`Error getting user profile: ${error?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get user profile from KV store
    const profile = await kv.get(`user:${user.id}`);
    
    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    return c.json({ user: profile });
  } catch (error) {
    console.log(`Unexpected error getting profile: ${error}`);
    return c.json({ error: "Internal server error getting profile" }, 500);
  }
});

// ==================== SPECIALTIES ROUTES ====================

// Initialize default specialties and doctors
app.post("/make-server-1d5449a0/init-data", async (c) => {
  try {
    // Initialize specialties
    const specialties = [
      { id: 'cardiology', name: 'Cardiology', description: 'Heart and cardiovascular system' },
      { id: 'neurology', name: 'Neurology', description: 'Brain and nervous system' },
      { id: 'pediatrics', name: 'Pediatrics', description: 'Children and adolescent care' },
      { id: 'orthopedics', name: 'Orthopedics', description: 'Bones, joints, and muscles' },
      { id: 'ophthalmology', name: 'Ophthalmology', description: 'Eye and vision care' },
      { id: 'dermatology', name: 'Dermatology', description: 'Skin and related conditions' },
      { id: 'psychiatry', name: 'Psychiatry', description: 'Mental health and wellness' },
      { id: 'internal-medicine', name: 'Internal Medicine', description: 'General adult medicine' }
    ];

    for (const specialty of specialties) {
      await kv.set(`specialty:${specialty.id}`, specialty);
    }

    // Initialize doctors
    const doctors = [
      { 
        id: '1', name: 'Dr. Sarah Wilson', specialty: 'cardiology', 
        rating: 4.9, experience: '15 years', dailyLimit: 12,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
      },
      { 
        id: '2', name: 'Dr. Michael Chen', specialty: 'cardiology', 
        rating: 4.8, experience: '12 years', dailyLimit: 10,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
      },
      { 
        id: '3', name: 'Dr. Emily Johnson', specialty: 'neurology', 
        rating: 4.9, experience: '18 years', dailyLimit: 8,
        image: 'https://images.unsplash.com/photo-1594824804732-ca8d8ac2de8e?w=150&h=150&fit=crop&crop=face'
      },
      { 
        id: '4', name: 'Dr. James Rodriguez', specialty: 'neurology', 
        rating: 4.7, experience: '14 years', dailyLimit: 10,
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
      },
      { 
        id: '5', name: 'Dr. Lisa Thompson', specialty: 'pediatrics', 
        rating: 4.8, experience: '10 years', dailyLimit: 15,
        image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=150&h=150&fit=crop&crop=face'
      },
      { 
        id: '6', name: 'Dr. Robert Martinez', specialty: 'orthopedics', 
        rating: 4.7, experience: '16 years', dailyLimit: 8,
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face'
      },
      { 
        id: '7', name: 'Dr. Jennifer Davis', specialty: 'ophthalmology', 
        rating: 4.9, experience: '13 years', dailyLimit: 12,
        image: 'https://images.unsplash.com/photo-1594824804732-ca8d8ac2de8e?w=150&h=150&fit=crop&crop=face'
      },
      { 
        id: '8', name: 'Dr. Alex Rodriguez', specialty: 'dermatology', 
        rating: 4.8, experience: '11 years', dailyLimit: 14,
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
      },
      { 
        id: '9', name: 'Dr. Maria Garcia', specialty: 'psychiatry', 
        rating: 4.7, experience: '9 years', dailyLimit: 6,
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
      },
      { 
        id: '10', name: 'Dr. Thomas Brown', specialty: 'internal-medicine', 
        rating: 4.6, experience: '20 years', dailyLimit: 16,
        image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
      }
    ];

    for (const doctor of doctors) {
      await kv.set(`doctor:${doctor.id}`, doctor);
      
      // Add doctor to specialty index
      const specialtyDoctors = await kv.get(`specialty:${doctor.specialty}:doctors`) || [];
      specialtyDoctors.push(doctor.id);
      await kv.set(`specialty:${doctor.specialty}:doctors`, specialtyDoctors);
    }

    return c.json({ message: "Data initialized successfully" });
  } catch (error) {
    console.log(`Error initializing data: ${error}`);
    return c.json({ error: "Failed to initialize data" }, 500);
  }
});

// Get all specialties
app.get("/make-server-1d5449a0/specialties", async (c) => {
  try {
    const specialtyIds = [
      'cardiology', 'neurology', 'pediatrics', 'orthopedics',
      'ophthalmology', 'dermatology', 'psychiatry', 'internal-medicine'
    ];
    
    const specialties = [];
    for (const id of specialtyIds) {
      const specialty = await kv.get(`specialty:${id}`);
      if (specialty) {
        specialties.push(specialty);
      }
    }

    return c.json({ specialties });
  } catch (error) {
    console.log(`Error fetching specialties: ${error}`);
    return c.json({ error: "Failed to fetch specialties" }, 500);
  }
});

// Get doctors by specialty
app.get("/make-server-1d5449a0/specialties/:specialtyId/doctors", async (c) => {
  try {
    const specialtyId = c.req.param('specialtyId');
    const doctorIds = await kv.get(`specialty:${specialtyId}:doctors`) || [];
    
    const doctors = [];
    for (const doctorId of doctorIds) {
      const doctor = await kv.get(`doctor:${doctorId}`);
      if (doctor) {
        doctors.push(doctor);
      }
    }

    return c.json({ doctors });
  } catch (error) {
    console.log(`Error fetching doctors for specialty: ${error}`);
    return c.json({ error: "Failed to fetch doctors" }, 500);
  }
});

// ==================== BOOKING ROUTES ====================

// Create a new booking
app.post("/make-server-1d5449a0/bookings", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized - No access token" }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      console.log(`Authorization error while creating booking: ${authError?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const bookingData = await c.req.json();
    const bookingId = `booking:${user.id}:${Date.now()}`;
    
    const booking = {
      id: bookingId,
      userId: user.id,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await kv.set(bookingId, booking);
    
    // Add to user's bookings index
    const userBookings = await kv.get(`user:${user.id}:bookings`) || [];
    userBookings.push(bookingId);
    await kv.set(`user:${user.id}:bookings`, userBookings);

    // Update booking count for the time slot
    const dateKey = bookingData.selectedDate;
    const timeSlotKey = `bookings:${bookingData.selectedDoctor}:${dateKey}:${bookingData.selectedTime}`;
    const currentCount = await kv.get(timeSlotKey) || 0;
    await kv.set(timeSlotKey, currentCount + 1);

    return c.json({ 
      booking,
      message: "Booking created successfully" 
    });
  } catch (error) {
    console.log(`Unexpected error creating booking: ${error}`);
    return c.json({ error: "Internal server error while creating booking" }, 500);
  }
});

// Get user bookings
app.get("/make-server-1d5449a0/bookings", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized - No access token" }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      console.log(`Authorization error while fetching bookings: ${authError?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const bookingIds = await kv.get(`user:${user.id}:bookings`) || [];
    
    const bookings = [];
    for (const bookingId of bookingIds) {
      const booking = await kv.get(bookingId);
      if (booking) {
        bookings.push(booking);
      }
    }

    return c.json({ bookings });
  } catch (error) {
    console.log(`Unexpected error fetching bookings: ${error}`);
    return c.json({ error: "Internal server error while fetching bookings" }, 500);
  }
});

// Get time slot availability
app.get("/make-server-1d5449a0/availability/:doctorId/:date/:timeSlot", async (c) => {
  try {
    const doctorId = c.req.param('doctorId');
    const date = c.req.param('date');
    const timeSlot = c.req.param('timeSlot');
    
    const doctor = await kv.get(`doctor:${doctorId}`);
    if (!doctor) {
      return c.json({ error: "Doctor not found" }, 404);
    }

    const timeSlotKey = `bookings:${doctorId}:${date}:${timeSlot}`;
    const currentCount = await kv.get(timeSlotKey) || 0;
    
    // Calculate period limit (half of daily limit)
    const periodLimit = Math.floor(doctor.dailyLimit / 2);
    
    return c.json({
      booked: currentCount,
      limit: periodLimit,
      available: currentCount < periodLimit
    });
  } catch (error) {
    console.log(`Error checking availability: ${error}`);
    return c.json({ error: "Failed to check availability" }, 500);
  }
});

// Update booking status
app.put("/make-server-1d5449a0/bookings/:bookingId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized - No access token" }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      console.log(`Authorization error while updating booking: ${authError?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    const bookingId = c.req.param('bookingId');
    const { status, paymentStatus } = await c.req.json();

    const booking = await kv.get(bookingId);
    if (!booking) {
      return c.json({ error: "Booking not found" }, 404);
    }

    // Verify ownership
    if (booking.userId !== user.id) {
      return c.json({ error: "Unauthorized to update this booking" }, 403);
    }

    const updatedBooking = {
      ...booking,
      status: status || booking.status,
      paymentStatus: paymentStatus || booking.paymentStatus,
      updatedAt: new Date().toISOString()
    };

    await kv.set(bookingId, updatedBooking);

    return c.json({ 
      booking: updatedBooking,
      message: "Booking updated successfully" 
    });
  } catch (error) {
    console.log(`Unexpected error updating booking: ${error}`);
    return c.json({ error: "Internal server error while updating booking" }, 500);
  }
});

// ==================== DOCTOR DASHBOARD ROUTES ====================

// Get doctor's appointments (protected route for doctors)
app.get("/make-server-1d5449a0/doctor/appointments", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: "Unauthorized - No access token" }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (authError || !user) {
      console.log(`Authorization error while fetching doctor appointments: ${authError?.message}`);
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get user profile to verify role
    const profile = await kv.get(`user:${user.id}`);
    if (!profile || profile.role !== 'doctor') {
      return c.json({ error: "Unauthorized - Not a doctor" }, 403);
    }

    // For now, return all bookings (in a real app, filter by doctor)
    const allBookingKeys = await kv.getByPrefix('booking:');
    const appointments = [];
    
    for (const key of allBookingKeys) {
      const booking = await kv.get(key);
      if (booking) {
        appointments.push(booking);
      }
    }

    return c.json({ appointments });
  } catch (error) {
    console.log(`Unexpected error fetching doctor appointments: ${error}`);
    return c.json({ error: "Internal server error while fetching appointments" }, 500);
  }
});

Deno.serve(app.fetch);
