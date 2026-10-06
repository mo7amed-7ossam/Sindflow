export type Language = 'ar' | 'en';

export interface AuthContent {
  brandName: string;
  systemTitle: string;
  langToggle: string;
  modeTabs: {
    login: string;
    register: string;
  };
  brandEditorial: {
    statement: string;
    substatement: string;
    meta: string;
  };
  login: {
    title: string;
    subtitle: string;
    identifierLabel: string;
    identifierPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    rememberMe: string;
    forgotPassword: string;
    submitButton: string;
    submitting: string;
  };
  register: {
    title: string;
    subtitle: string;
    usernameLabel: string;
    usernamePlaceholder: string;
    identifierLabel: string;
    identifierPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    submitButton: string;
    submitting: string;
  };
  forgot: {
    title: string;
    subtitle: string;
    identifierLabel: string;
    identifierPlaceholder: string;
    submitButton: string;
    submitting: string;
    backToLogin: string;
    sentConfirmation: string;
  };
  validation: {
    required: string;
    invalidIdentifier: string;
    passwordLength: string;
    passwordMismatch: string;
  };
  legalNote: string;
  // SindFlow Authenticated App Content
  sindFlow: {
    nav: {
      home: string;
      myTasks: string;
      team: string;
      projects: string;
      notifications: string;
      collapse: string;
      expand: string;
    };
    navbar: {
      breadcrumb: string;
      workspace: string;
      searchPlaceholder: string;
      newTaskButton: string;
      notificationsTitle: string;
      markAllRead: string;
      profileTitle: string;
      roleSubtitle: string;
      authScreenToggle: string;
      signOut: string;
    };
    home: {
      greeting: string;
      contextMessage: string;
      teamBadge: string;
      metrics: {
        todayTasks: string;
        inProgress: string;
        completedWeek: string;
        needsAttention: string;
      };
      tasksSection: {
        title: string;
        subtitle: string;
        filterAll: string;
        filterToday: string;
        filterUrgent: string;
        filterReview: string;
        emptyState: string;
      };
      activitySection: {
        title: string;
        subtitle: string;
        viewAll: string;
      };
      priorities: {
        high: string;
        medium: string;
        normal: string;
      };
      statuses: {
        pending: string;
        inProgress: string;
        review: string;
        completed: string;
      };
    };
    footer: {
      systemNote: string;
      support: string;
      policy: string;
      version: string;
    };
    modal: {
      title: string;
      subtitle: string;
      taskTitleLabel: string;
      taskTitlePlaceholder: string;
      projectLabel: string;
      priorityLabel: string;
      dueDateLabel: string;
      cancel: string;
      create: string;
    };
  };
}

export const translations: Record<Language, AuthContent> = {
  ar: {
    brandName: 'سندباد',
    systemTitle: 'نظام إدارة المهام',
    langToggle: 'English',
    modeTabs: {
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب جديد',
    },
    brandEditorial: {
      statement: 'كل مهام فرق سندباد، في مساحة عمل واحدة.',
      substatement: 'إدارة المهام، متابعة التقدم، وتنسيق العمل بين الفرق — في مكان واحد.',
      meta: 'بيئة عمل داخلية مؤمّنة',
    },
    login: {
      title: 'تسجيل الدخول',
      subtitle: 'أدخل بيانات حسابك المؤسسي للمتابعة إلى مساحة العمل',
      identifierLabel: 'بيانات الحساب',
      identifierPlaceholder: 'البريد الإلكتروني أو رقم الهاتف',
      passwordLabel: 'كلمة المرور',
      passwordPlaceholder: '••••••••',
      rememberMe: 'تذكر تسجيل الدخول',
      forgotPassword: 'نسيت كلمة المرور؟',
      submitButton: 'تسجيل الدخول',
      submitting: 'جاري تسجيل الدخول...',
    },
    register: {
      title: 'إنشاء حساب جديد',
      subtitle: 'سجّل بياناتك للانضمام إلى منصة مهام سندباد',
      usernameLabel: 'اسم المستخدم',
      usernamePlaceholder: 'مثال: ahmed.ali أو أحمد علي',
      identifierLabel: 'بيانات الحساب',
      identifierPlaceholder: 'البريد الإلكتروني أو رقم الهاتف',
      passwordLabel: 'كلمة المرور',
      passwordPlaceholder: '8 أحرف على الأقل',
      confirmPasswordLabel: 'تأكيد كلمة المرور',
      confirmPasswordPlaceholder: 'إعادة إدخال كلمة المرور',
      submitButton: 'إنشاء الحساب',
      submitting: 'جاري إنشاء الحساب...',
    },
    forgot: {
      title: 'استعادة كلمة المرور',
      subtitle: 'أدخل بريدك الإلكتروني أو رقم هاتفك وسنرسل لك رابط إعادة التعيين',
      identifierLabel: 'بيانات الحساب',
      identifierPlaceholder: 'البريد الإلكتروني أو رقم الهاتف',
      submitButton: 'إرسال رابط الاستعادة',
      submitting: 'جاري الإرسال...',
      backToLogin: 'العودة لتسجيل الدخول',
      sentConfirmation: 'تم إرسال رابط إعادة التعيين بنجاح',
    },
    validation: {
      required: 'هذا الحقل مطلوب',
      invalidIdentifier: 'يرجى إدخال بريد إلكتروني أو رقم هاتف صحيح',
      passwordLength: 'يجب ألا تقل كلمة المرور عن 8 خانات',
      passwordMismatch: 'كلمتا المرور غير متطابقتين',
    },
    legalNote: 'نظام إدارة المهام الداخلي &bull; شركة سندباد',
    sindFlow: {
      nav: {
        home: 'الرئيسية',
        myTasks: 'مهامي',
        team: 'الفريق',
        projects: 'المشاريع',
        notifications: 'الإشعارات',
        collapse: 'طي القائمة',
        expand: 'توسيع القائمة',
      },
      navbar: {
        breadcrumb: 'الرئيسية',
        workspace: 'مساحة العمل',
        searchPlaceholder: 'بحث سريع في المهام أو المشاريع... (⌘K)',
        newTaskButton: 'مهمة جديدة',
        notificationsTitle: 'الإشعارات والتحديثات',
        markAllRead: 'تحديد الكل كمقروء',
        profileTitle: 'حجازي',
        roleSubtitle: 'فريق العمليات والخدمات',
        authScreenToggle: 'عرض شاشة الدخول',
        signOut: 'تسجيل الخروج',
      },
      home: {
        greeting: 'مرحبًا، حجازي',
        contextMessage: 'إليك نظرة سريعة على مساحة عملك والمهام ذات الأولوية اليوم.',
        teamBadge: 'فريق العمليات والخدمات',
        metrics: {
          todayTasks: 'مهام اليوم',
          inProgress: 'قيد التنفيذ',
          completedWeek: 'المكتملة هذا الأسبوع',
          needsAttention: 'تتطلب الانتباه',
        },
        tasksSection: {
          title: 'المهام ذات الأولوية',
          subtitle: 'قائمة المهام المعينة لك التي تتطلب متابعة أو إنجاز',
          filterAll: 'الكل',
          filterToday: 'اليوم',
          filterUrgent: 'عاجل',
          filterReview: 'قيد المراجعة',
          emptyState: 'لا توجد مهام تطابق هذا التصنيف حالياً',
        },
        activitySection: {
          title: 'آخر مستجدات الفريق',
          subtitle: 'تحديثات الإنجاز وحركات العمل الأخيرة بين أفراد الفريق',
          viewAll: 'سجل النشاط',
        },
        priorities: {
          high: 'عالية',
          medium: 'متوسطة',
          normal: 'عادية',
        },
        statuses: {
          pending: 'قيد الانتظار',
          inProgress: 'قيد العمل',
          review: 'قيد المراجعة',
          completed: 'مكتملة',
        },
      },
      footer: {
        systemNote: 'منظومة سندفلو &bull; نظام إدارة العمل والمهام الداخلي لشركة سندباد',
        support: 'الدعم الفني الداخلي',
        policy: 'سياسة الاستخدام المؤسسي',
        version: 'v2.4.0 (مستقر)',
      },
      modal: {
        title: 'إضافة مهمة جديدة',
        subtitle: 'أدخل تفاصيل المهمة لتوزيعها وإضافتها إلى مسار العمل',
        taskTitleLabel: 'عنوان المهمة',
        taskTitlePlaceholder: 'مثال: إعداد تقرير الشحنات اللوجستية للأسبوع الثالث',
        projectLabel: 'المشروع / المسار',
        priorityLabel: 'درجة الأولوية',
        dueDateLabel: 'موعد التسليم',
        cancel: 'إلغاء',
        create: 'حفظ المهمة',
      },
    },
  },
  en: {
    brandName: 'Sindbad',
    systemTitle: 'Task Management System',
    langToggle: 'العربية',
    modeTabs: {
      login: 'Sign In',
      register: 'Create Account',
    },
    brandEditorial: {
      statement: 'All Sindbad team workflows, unified in one space.',
      substatement: 'Manage tasks, track progress, and coordinate workflows across teams — in one place.',
      meta: 'Internal Secure Environment',
    },
    login: {
      title: 'Sign In',
      subtitle: 'Enter your company credentials to access your workspace',
      identifierLabel: 'Account Credentials',
      identifierPlaceholder: 'Email address or phone number',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      rememberMe: 'Remember this session',
      forgotPassword: 'Forgot password?',
      submitButton: 'Sign In',
      submitting: 'Signing in...',
    },
    register: {
      title: 'Create Account',
      subtitle: 'Register your details to join team workflows',
      usernameLabel: 'Username',
      usernamePlaceholder: 'e.g. ahmed.ali',
      identifierLabel: 'Account Credentials',
      identifierPlaceholder: 'Email address or phone number',
      passwordLabel: 'Password',
      passwordPlaceholder: '8 characters minimum',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      submitButton: 'Create Account',
      submitting: 'Creating account...',
    },
    forgot: {
      title: 'Reset Password',
      subtitle: 'Enter your email or phone to receive a reset link',
      identifierLabel: 'Account Credentials',
      identifierPlaceholder: 'Email address or phone number',
      submitButton: 'Send Reset Link',
      submitting: 'Sending...',
      backToLogin: 'Back to sign in',
      sentConfirmation: 'Reset link dispatched to your registered address',
    },
    validation: {
      required: 'This field is required',
      invalidIdentifier: 'Please enter a valid email address or phone number',
      passwordLength: 'Password must be at least 8 characters',
      passwordMismatch: 'Passwords do not match',
    },
    legalNote: 'Internal Task Management Platform &bull; Sindbad LLC',
    sindFlow: {
      nav: {
        home: 'Home',
        myTasks: 'My Tasks',
        team: 'Team',
        projects: 'Projects',
        notifications: 'Notifications',
        collapse: 'Collapse Sidebar',
        expand: 'Expand Sidebar',
      },
      navbar: {
        breadcrumb: 'Home',
        workspace: 'Workspace',
        searchPlaceholder: 'Quick search tasks or projects... (⌘K)',
        newTaskButton: 'New Task',
        notificationsTitle: 'Notifications & Updates',
        markAllRead: 'Mark all as read',
        profileTitle: 'Hijazi',
        roleSubtitle: 'Operations & Services',
        authScreenToggle: 'Auth Screen Preview',
        signOut: 'Sign Out',
      },
      home: {
        greeting: 'Welcome, Hijazi',
        contextMessage: 'Here is a quick overview of your workspace and priority tasks today.',
        teamBadge: 'Operations & Services Team',
        metrics: {
          todayTasks: "Today's Tasks",
          inProgress: 'In Progress',
          completedWeek: 'Completed This Week',
          needsAttention: 'Needs Attention',
        },
        tasksSection: {
          title: 'Priority Tasks',
          subtitle: 'Assigned tasks requiring your action or completion',
          filterAll: 'All',
          filterToday: 'Today',
          filterUrgent: 'Urgent',
          filterReview: 'In Review',
          emptyState: 'No tasks currently match this category',
        },
        activitySection: {
          title: 'Team Updates',
          subtitle: 'Recent progress and collaborative milestones across team members',
          viewAll: 'Activity Log',
        },
        priorities: {
          high: 'High',
          medium: 'Medium',
          normal: 'Normal',
        },
        statuses: {
          pending: 'Pending',
          inProgress: 'In Progress',
          review: 'In Review',
          completed: 'Completed',
        },
      },
      footer: {
        systemNote: 'SindFlow &bull; Internal Work Management Platform &bull; Sindbad LLC',
        support: 'Internal Support',
        policy: 'Enterprise Usage Policy',
        version: 'v2.4.0 (Stable)',
      },
      modal: {
        title: 'Create New Task',
        subtitle: 'Enter task parameters to schedule into the active workflow',
        taskTitleLabel: 'Task Title',
        taskTitlePlaceholder: 'e.g. Prepare logistics audit for week 3 dispatch',
        projectLabel: 'Project / Stream',
        priorityLabel: 'Priority Level',
        dueDateLabel: 'Due Date',
        cancel: 'Cancel',
        create: 'Create Task',
      },
    },
  },
};
