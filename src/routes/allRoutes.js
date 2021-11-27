import React from "react"
import { Redirect } from "react-router-dom"

// // Pages Component
import Chat from "../pages/Chat/Chat"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Pages Calendar
import Calendar from "../pages/Calendar/index"

// //Tasks
import TasksList from "../pages/Tasks/tasks-list"
import TasksCreate from "../pages/Tasks/tasks-create"

// Journal 
import Journal from "../pages/Journal/journal-log"
import Note from "../pages/Journal/journal-note"
import NoteCreate from "../pages/Journal/note-create"

//Invoices
import InvoicesList from "../pages/Invoices/invoices-list"
import InvoiceDetail from "../pages/Invoices/invoices-detail"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Resources
import Resources from "../pages/Resources/resources"

// Charts
import ChartApex from "../pages/Charts/Apexcharts"
import ChartistChart from "../pages/Charts/ChartistChart"
import ChartjsChart from "../pages/Charts/ChartjsChart"
import SparklineChart from "../pages/Charts/SparklineChart"
import ChartsKnob from "../pages/Charts/charts-knob"

// Maps
import MapsVector from "../pages/Maps/MapsVector"

//Icons
import IconBoxicons from "../pages/Icons/IconBoxicons"
import IconDripicons from "../pages/Icons/IconDripicons"
import IconFontawesome from "../pages/Icons/IconFontawesome"

//Tables
import BasicTables from "../pages/Tables/BasicTables"
import DatatableTables from "../pages/Tables/DatatableTables"
import ResponsiveTables from "../pages/Tables/ResponsiveTables"

// Forms
import FormElements from "../pages/Forms/FormElements"
import FormLayouts from "../pages/Forms/FormLayouts"
import FormEditors from "../pages/Forms/FormEditors"
import FormValidations from "../pages/Forms/FormValidations"
import FormRepeater from "../pages/Forms/FormRepeater"
import FormUpload from "../pages/Forms/FormUpload"
import DesignWizard from "../pages/Design/design-wizard"

//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiColors from "../pages/Ui/UiColors"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGeneral from "../pages/Ui/UiGeneral"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiProgressbar from "../pages/Ui/UiProgressbar"
import UiSweetAlert from "../pages/Ui/UiSweetAlert"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiTypography from "../pages/Ui/UiTypography"
import UiVideo from "../pages/Ui/UiVideo"
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout"
import UiImageCropper from "../pages/Ui/ui-image-cropper"
import DesignGallery from "../pages/Gallery/design-gallery"

//Pages
import PagesStarter from "../pages/Utility/pages-starter"
import PagesMaintenance from "../pages/Utility/pages-maintenance"
import PagesComingsoon from "../pages/Utility/pages-comingsoon"
import PagesTimeline from "../pages/Utility/pages-timeline"
import PagesFaqs from "../pages/Utility/pages-faqs"
import PagesPricing from "../pages/Utility/pages-pricing"
import Pages404 from "../pages/Utility/pages-404"
import Pages500 from "../pages/Utility/pages-500"

//Contacts
import ContactsGrid from "../pages/Contacts/contacts-grid"
import SageList from "../pages/Design/sage-designer"

const userRoutes = [
  { path: "/dashboard", component: Dashboard },

  // profile
  { path: "/designer", component: SageList },

  // gallery
  { path: "/gallery", component: DesignGallery },

  // //calendar
  { path: "/calendar", component: Calendar },

  // //profile
  { path: "/profile", component: UserProfile },

  //Invoices
  { path: "/invoices-list", component: InvoicesList },
  { path: "/invoices-detail", component: InvoiceDetail },
  { path: "/invoices-detail/:id", component: InvoiceDetail },

  // Tasks
  { path: "/tasks-list", component: TasksList },
  { path: "/tasks-create", component: TasksCreate },

  // Resources
  { path: "/resources", component: Resources },

  // Journal
  { path: "/journal", component: Journal },
  { path: "/journal/note", component: Note },
  { path: "/journal/note/create", component: NoteCreate },

  // Contacts
  { path: "/contacts-grid", component: ContactsGrid },

  //Charts
  { path: "/apex-charts", component: ChartApex },
  { path: "/chartist-charts", component: ChartistChart },
  { path: "/chartjs-charts", component: ChartjsChart },
  { path: "/sparkline-charts", component: SparklineChart },
  { path: "/charts-knob", component: ChartsKnob },

  // Icons
  { path: "/icons-boxicons", component: IconBoxicons },
  { path: "/icons-dripicons", component: IconDripicons },
  { path: "/icons-fontawesome", component: IconFontawesome },

  // Tables
  { path: "/tables-basic", component: BasicTables },
  { path: "/tables-datatable", component: DatatableTables },
  { path: "/tables-responsive", component: ResponsiveTables },

  // Maps
  { path: "/maps-vector", component: MapsVector },

  // Forms
  { path: "/form-elements", component: FormElements },
  { path: "/form-layouts", component: FormLayouts },
  { path: "/form-editors", component: FormEditors },
  { path: "/form-repeater", component: FormRepeater },
  { path: "/form-uploads", component: FormUpload },
  { path: "/design-wizard", component: DesignWizard },
  { path: "/form-validation", component: FormValidations },

  // Ui
  { path: "/ui-alerts", component: UiAlert },
  { path: "/ui-buttons", component: UiButtons },
  { path: "/ui-cards", component: UiCards },
  { path: "/ui-carousel", component: UiCarousel },
  { path: "/ui-colors", component: UiColors },
  { path: "/ui-dropdowns", component: UiDropdown },
  { path: "/ui-general", component: UiGeneral },
  { path: "/ui-grid", component: UiGrid },
  { path: "/ui-images", component: UiImages },
  { path: "/ui-lightbox", component: UiLightbox },
  { path: "/ui-modals", component: UiModal },
  { path: "/ui-progressbars", component: UiProgressbar },
  { path: "/ui-sweet-alert", component: UiSweetAlert },
  { path: "/ui-tabs-accordions", component: UiTabsAccordions },
  { path: "/ui-typography", component: UiTypography },
  { path: "/ui-video", component: UiVideo },
  { path: "/ui-session-timeout", component: UiSessionTimeout },
  { path: "/ui-image-cropper", component: UiImageCropper },

  //Utility
  { path: "/pages-starter", component: PagesStarter },
  { path: "/pages-timeline", component: PagesTimeline },
  { path: "/pages-faqs", component: PagesFaqs },
  { path: "/pages-pricing", component: PagesPricing },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },

  { path: "/pages-maintenance", component: PagesMaintenance },
  { path: "/pages-comingsoon", component: PagesComingsoon },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-500", component: Pages500 },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-register", component: Register1 },
  { path: "/pages-forget-pwd", component: ForgetPwd1 },
  { path: "/auth-lock-screen", component: LockScreen },
]

export { userRoutes, authRoutes }
